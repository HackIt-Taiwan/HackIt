import { NextResponse } from 'next/server';
import type { Event, EventFrontmatter } from '@/utils/events';

type NocoDbRow = Record<string, unknown>;

const DEFAULT_LIMIT = 1000;
const DEFAULT_CACHE_TTL_MS = 60_000;
const CACHE_TTL_MS = (() => {
  const raw = process.env.NOCODB_EVENTS_CACHE_TTL_MS;
  if (!raw) return DEFAULT_CACHE_TTL_MS;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : DEFAULT_CACHE_TTL_MS;
})();

type ShareRecordsConfig = {
  recordsUrls: string[];
  baseOrigin: string;
};

let resolvedRecordsUrl: string | null = null;
let cachedEvents: Event[] | null = null;
let cachedAt = 0;
let cachePromise: Promise<Event[]> | null = null;

function getShareRecordsConfig(): ShareRecordsConfig {
  const apiUrl = process.env.NOCODB_EVENTS_API_URL;
  if (apiUrl) {
    let url: URL;
    try {
      url = new URL(apiUrl);
    } catch {
      throw new Error('NOCODB_EVENTS_API_URL must be a valid URL');
    }
    return { recordsUrls: [apiUrl], baseOrigin: url.origin };
  }

  const shareUrl = process.env.NOCODB_EVENTS_SHARE_URL;
  if (!shareUrl) {
    throw new Error('NOCODB_EVENTS_SHARE_URL is not set');
  }

  let url: URL;
  try {
    url = new URL(shareUrl);
  } catch {
    throw new Error('NOCODB_EVENTS_SHARE_URL must be a valid URL');
  }

  if (url.pathname.includes('/api/')) {
    return { recordsUrls: [shareUrl], baseOrigin: url.origin };
  }

  const shareId = extractShareId(url);
  const viewId = extractViewId(url);

  const recordsUrls: string[] = [];
  if (shareId) {
    recordsUrls.push(`${url.origin}/api/v2/shared/${shareId}/records`);
    recordsUrls.push(`${url.origin}/api/v1/db/public/shared-view/${shareId}/rows`);
  }

  if (!shareId && viewId) {
    recordsUrls.push(`${url.origin}/api/v1/db/public/shared-view/${viewId}/rows`);
  }

  if (!recordsUrls.length) {
    throw new Error('Unable to parse shared view id from NOCODB_EVENTS_SHARE_URL (use a public share link or set NOCODB_EVENTS_API_URL)');
  }

  return {
    recordsUrls,
    baseOrigin: url.origin,
  };
}

function extractShareId(url: URL): string | null {
  const candidates = [
    url.searchParams.get('share'),
    url.searchParams.get('shared'),
    url.searchParams.get('shareId'),
    url.searchParams.get('sharedViewId'),
  ].filter(Boolean) as string[];

  if (candidates.length) {
    return candidates[0];
  }

  const hash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;
  const [hashPath, hashQuery] = hash.split('?', 2);
  if (hashQuery) {
    const hashParams = new URLSearchParams(hashQuery);
    const hashShare =
      hashParams.get('share') ||
      hashParams.get('shared') ||
      hashParams.get('shareId') ||
      hashParams.get('sharedViewId');
    if (hashShare) {
      return hashShare;
    }
  }

  const combined = `${url.pathname}${hashPath ? `/${hashPath}` : ''}`;
  const match = combined.match(/(?:share|shared)\/([a-zA-Z0-9-]+)/);
  return match ? match[1] : null;
}

function extractViewId(url: URL): string | null {
  const hash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;
  const [hashPath] = hash.split('?', 1);
  const combined = `${url.pathname}${hashPath ? `/${hashPath}` : ''}`;
  const match = combined.match(/(?:view)\/([a-zA-Z0-9-]+)/);
  return match ? match[1] : null;
}

function withLimit(recordsUrl: string): string {
  const url = new URL(recordsUrl);
  if (!url.searchParams.has('limit')) {
    url.searchParams.set('limit', String(DEFAULT_LIMIT));
  }
  return url.toString();
}

async function fetchRecords(recordsUrls: string[]): Promise<Response> {
  const candidates = resolvedRecordsUrl && recordsUrls.includes(resolvedRecordsUrl)
    ? [resolvedRecordsUrl, ...recordsUrls.filter(url => url !== resolvedRecordsUrl)]
    : recordsUrls;

  let lastError: Error | null = null;
  for (const recordsUrl of candidates) {
    try {
      const response = await fetch(withLimit(recordsUrl), { cache: 'no-store' });
      if (response.ok) {
        resolvedRecordsUrl = recordsUrl;
        return response;
      }
      lastError = new Error(`NocoDB request failed: ${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('NocoDB request failed');
    }
  }

  throw lastError ?? new Error('NocoDB request failed');
}

async function fetchEvents(): Promise<Event[]> {
  const { recordsUrls, baseOrigin } = getShareRecordsConfig();
  const response = await fetchRecords(recordsUrls);
  const payload = await response.json();
  const rows = extractRows(payload);
  return rows
    .map(row => normalizeEvent(row, baseOrigin))
    .filter((event): event is Event => Boolean(event));
}

async function loadEventsWithCache(): Promise<Event[]> {
  const now = Date.now();
  if (cachedEvents && now - cachedAt < CACHE_TTL_MS) {
    return cachedEvents;
  }

  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = (async () => {
    const events = await fetchEvents();
    cachedEvents = events;
    cachedAt = Date.now();
    return events;
  })();

  try {
    return await cachePromise;
  } catch (error) {
    if (cachedEvents) {
      return cachedEvents;
    }
    throw error;
  } finally {
    cachePromise = null;
  }
}

function extractRows(payload: unknown): NocoDbRow[] {
  if (Array.isArray(payload)) {
    return payload as NocoDbRow[];
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const record = payload as Record<string, unknown>;
  const candidates = [record.list, record.records, record.data, record.rows];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate as NocoDbRow[];
    }
  }

  return [];
}

function getField(row: NocoDbRow, key: string): unknown {
  if (Object.prototype.hasOwnProperty.call(row, key)) {
    return row[key];
  }

  const lowerKey = key.toLowerCase();
  for (const [rowKey, value] of Object.entries(row)) {
    if (rowKey.toLowerCase() === lowerKey) {
      return value;
    }
  }

  return undefined;
}

function coerceString(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (value == null) {
    return '';
  }

  return String(value);
}

function coerceOptionalString(value: unknown): string | undefined {
  const result = coerceString(value);
  return result ? result : undefined;
}

function coerceNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) {
      const parsed = Number(trimmed);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
}

function coerceBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return ['true', '1', 'yes', 'y'].includes(normalized);
  }

  return false;
}

function coerceOptionalBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return coerceBoolean(value);
}

function coerceDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return coerceString(value);
}

function parseDateOnly(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const datePart = trimmed.split('T')[0];
  const match = datePart.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const fallback = new Date(trimmed);
  if (Number.isNaN(fallback.getTime())) {
    return null;
  }
  fallback.setHours(0, 0, 0, 0);
  return fallback;
}

function computeIsCompleted(date: string, endDate?: string): boolean {
  const endDateValue = endDate && endDate.trim() ? endDate : date;
  const eventEnd = parseDateOnly(endDateValue);
  if (!eventEnd) {
    return false;
  }

  const completionDate = new Date(eventEnd);
  completionDate.setDate(completionDate.getDate() + 1);
  completionDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today >= completionDate;
}

function coerceStringArray(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map(item => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') {
          const record = item as Record<string, unknown>;
          const label = record.label ?? record.name ?? record.title ?? record.value;
          if (typeof label === 'string') {
            return label.trim();
          }
        }
        return String(item).trim();
      })
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return [];
    }

    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        const parsed = JSON.parse(trimmed);
        return coerceStringArray(parsed);
      } catch {
        // Fall through to comma split.
      }
    }

    return trimmed
      .split(/[,;/]/)
      .map(item => item.trim())
      .filter(Boolean);
  }

  return [String(value).trim()].filter(Boolean);
}

function resolveUrl(rawUrl: string, baseOrigin: string): string {
  if (!rawUrl) {
    return '';
  }

  try {
    return new URL(rawUrl).toString();
  } catch {
    if (!baseOrigin) {
      return rawUrl;
    }
  }

  try {
    return new URL(rawUrl, baseOrigin).toString();
  } catch {
    return rawUrl;
  }
}

function coerceImage(value: unknown, baseOrigin: string): string {
  if (typeof value === 'string') {
    return resolveUrl(value.trim(), baseOrigin);
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const url = coerceImage(item, baseOrigin);
      if (url) return url;
    }
    return '';
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const preferredUrl =
      record.signedUrl ??
      record.signedPath ??
      record.url ??
      record.path;

    if (typeof preferredUrl === 'string') {
      return resolveUrl(preferredUrl.trim(), baseOrigin);
    }

    const thumbnails = record.thumbnails;
    if (thumbnails && typeof thumbnails === 'object') {
      const thumbRecord = thumbnails as Record<string, unknown>;
      const preferredThumbKeys = ['large', 'card_cover', 'small', 'tiny'];
      for (const key of preferredThumbKeys) {
        const entry = thumbRecord[key];
        if (entry && typeof entry === 'object') {
          const signedUrl = (entry as Record<string, unknown>).signedUrl;
          if (typeof signedUrl === 'string') {
            return resolveUrl(signedUrl.trim(), baseOrigin);
          }
        }
      }

      for (const entry of Object.values(thumbRecord)) {
        if (entry && typeof entry === 'object') {
          const signedUrl = (entry as Record<string, unknown>).signedUrl;
          if (typeof signedUrl === 'string') {
            return resolveUrl(signedUrl.trim(), baseOrigin);
          }
        }
      }
    }
  }

  return '';
}

function normalizeEvent(row: NocoDbRow, baseOrigin: string): Event | null {
  const slug = coerceString(getField(row, 'slug'));
  const title = coerceString(getField(row, 'title'));
  const date = coerceDateString(getField(row, 'date'));
  const image = coerceImage(getField(row, 'image'), baseOrigin);
  const endDate = coerceOptionalString(getField(row, 'endDate'));

  if (!slug || !title || !date || !image) {
    return null;
  }

  const frontmatter: EventFrontmatter = {
    id: coerceNumber(getField(row, 'id')),
    title,
    date,
    endDate,
    time: coerceString(getField(row, 'time')),
    location: coerceString(getField(row, 'location')),
    image,
    category: coerceString(getField(row, 'category')),
    tags: coerceStringArray(getField(row, 'tags')),
    spots: coerceNumber(getField(row, 'spots')),
    spotsLeft: coerceNumber(getField(row, 'spotsLeft')),
    isCompleted: computeIsCompleted(date, endDate),
    isFeatured: coerceOptionalBoolean(getField(row, 'isFeatured')),
    color: coerceOptionalString(getField(row, 'color')),
    emoji: coerceOptionalString(getField(row, 'emoji')),
    description: coerceString(getField(row, 'description')),
    url: coerceOptionalString(getField(row, 'url')),
  };

  const content = coerceString(getField(row, 'content'));

  return { slug, frontmatter, content };
}

export async function GET() {
  try {
    const events = await loadEventsWithCache();
    const maxAgeSeconds = Math.max(0, Math.floor(CACHE_TTL_MS / 1000));

    return NextResponse.json(events, {
      headers: {
        'Cache-Control': `public, max-age=${maxAgeSeconds}`,
      },
    });
  } catch (error) {
    console.error('Error loading events from NocoDB:', error);
    return NextResponse.json([], { status: 500 });
  }
}
