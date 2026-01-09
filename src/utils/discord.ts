export type DiscordMemberResponse = {
  memberCount: number;
  guildName?: string;
  error?: string;
  fromCache?: boolean;
};

type DiscordInviteResponse = {
  approximate_member_count?: number;
  guild?: {
    id?: string;
    name?: string;
  };
};

const DEFAULT_INVITE_URL = 'https://discord.gg/hackit';
const INVITE_API_BASE = 'https://discord.com/api/v10/invites';
const DEFAULT_CACHE_TTL_MS = 15 * 60 * 1000;

type CacheEntry = {
  memberCount: number;
  guildName?: string;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<DiscordMemberResponse>>();

type FetchDiscordMemberOptions = {
  inviteUrl?: string;
  cacheTtlMs?: number;
  forceRefresh?: boolean;
  signal?: AbortSignal;
};

function resolveInviteUrl(inviteUrl?: string): string {
  return inviteUrl || process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || DEFAULT_INVITE_URL;
}

export function extractDiscordInviteCode(inviteUrl: string): string | null {
  if (!inviteUrl) return null;
  const trimmed = inviteUrl.trim();
  if (!trimmed) return null;

  if (!trimmed.includes('/')) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const parts = url.pathname.split('/').filter(Boolean);
    if (!parts.length) return null;
    if (parts[0] === 'invite' && parts[1]) return parts[1];
    return parts[0];
  } catch {
    const parts = trimmed.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : null;
  }
}

export async function fetchDiscordMemberCount(
  options: FetchDiscordMemberOptions = {}
): Promise<DiscordMemberResponse> {
  const { inviteUrl, cacheTtlMs = DEFAULT_CACHE_TTL_MS, forceRefresh = false, signal } = options;
  const resolvedInviteUrl = resolveInviteUrl(inviteUrl);
  const inviteCode = extractDiscordInviteCode(resolvedInviteUrl);

  if (!inviteCode) {
    return { memberCount: 0, error: 'Missing Discord invite code.' };
  }

  const cached = cache.get(inviteCode);
  if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
    return { memberCount: cached.memberCount, guildName: cached.guildName, fromCache: true };
  }

  const existing = inFlight.get(inviteCode);
  if (!forceRefresh && existing) {
    return existing;
  }

  const request = (async () => {
    try {
      const response = await fetch(
        `${INVITE_API_BASE}/${encodeURIComponent(inviteCode)}?with_counts=true&with_expiration=true`,
        {
          signal,
          credentials: 'omit',
        }
      );

      if (!response.ok) {
        return { memberCount: 0, error: `Discord invite request failed: ${response.status}` };
      }

      const data = (await response.json()) as DiscordInviteResponse;
      const memberCount = data.approximate_member_count ?? 0;
      const guildName = data.guild?.name;

      if (memberCount > 0) {
        cache.set(inviteCode, {
          memberCount,
          guildName,
          expiresAt: Date.now() + cacheTtlMs,
        });
      }

      return { memberCount, guildName, fromCache: false };
    } catch (error) {
      if (cached) {
        return {
          memberCount: cached.memberCount,
          guildName: cached.guildName,
          fromCache: true,
          error: error instanceof Error ? error.message : 'Discord invite request failed.',
        };
      }

      return {
        memberCount: 0,
        error: error instanceof Error ? error.message : 'Discord invite request failed.',
      };
    } finally {
      inFlight.delete(inviteCode);
    }
  })();

  inFlight.set(inviteCode, request);
  return request;
}
