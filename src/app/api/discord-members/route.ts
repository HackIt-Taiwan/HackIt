import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

// Force dynamic rendering while allowing revalidation.
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate hourly (3600 seconds).

// Cache paths and file name.
const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'discord-members.json');
const CACHE_EXPIRY = 60 * 60 * 1000; // Cache TTL: 1 hour (ms).

// Cache data shape.
interface CacheData {
  memberCount: number;
  guildName: string;
  timestamp: number;
  [key: string]: any;
}

// Ensure the cache directory exists.
if (!fs.existsSync(CACHE_DIR)) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error('無法創建緩存目錄:', error);
  }
}

// Read cached data.
function getCachedData(): CacheData | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) as CacheData;
      
      // Check cache expiry.
      if (cacheData.timestamp && (Date.now() - cacheData.timestamp) < CACHE_EXPIRY) {
        console.log('使用緩存的Discord成員數據', {
          memberCount: cacheData.memberCount,
          cacheAge: Math.round((Date.now() - cacheData.timestamp) / 1000 / 60) + '分鐘'
        });
        return cacheData;
      }
    }
  } catch (error) {
    console.error('讀取緩存失敗:', error);
  }
  return null;
}

// Persist data to cache.
function saveCacheData(data: Record<string, any>): void {
  try {
    // Add cache timestamp.
    const cacheData = {
      ...data,
      timestamp: Date.now()
    };
    
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log('Discord成員數據已緩存');
  } catch (error) {
    console.error('寫入緩存失敗:', error);
  }
}

export async function GET(request: NextRequest) {
  // Check for forced refresh.
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('force') === 'true';
  
  // Use cache unless forced to refresh.
  if (!forceRefresh) {
    const cachedData = getCachedData();
    if (cachedData) {
      return NextResponse.json({
        memberCount: cachedData.memberCount,
        guildName: cachedData.guildName,
        fromCache: true,
        cacheTime: new Date(cachedData.timestamp).toISOString()
      });
    }
  }
  
  // Fetch from Discord API when cache is missing or expired.
  try {
    // Requires DISCORD_BOT_TOKEN and DISCORD_SERVER_ID env vars.
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;

    if (!DISCORD_BOT_TOKEN || !DISCORD_SERVER_ID) {
      console.error('缺少Discord配置:', { 
        hasToken: !!DISCORD_BOT_TOKEN, 
        hasServerId: !!DISCORD_SERVER_ID 
      });
      throw new Error('Discord 配置缺失');
    }

    console.log('正在從Discord API獲取成員數據...');
    
    // Use /guilds/{guild.id}?with_counts=true for approximate counts.
    const response = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_SERVER_ID}?with_counts=true`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Discord API請求失敗:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Discord API請求失敗: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const result = {
      memberCount: data.approximate_member_count || data.member_count,
      guildName: data.name,
      fromApi: true,
      fetchTime: new Date().toISOString()
    };
    
    console.log('成功獲取Discord數據:', {
      memberCount: result.memberCount,
      guildName: result.guildName
    });
    
    // Cache the result.
    saveCacheData(result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('獲取Discord成員數量失敗:', error);
    
    // If the API fails, fall back to stale cache if available.
    const expiredCache = getCachedData();
    if (expiredCache) {
      console.log('API請求失敗，使用過期緩存作為後備');
      return NextResponse.json({ 
        memberCount: expiredCache.memberCount,
        guildName: expiredCache.guildName,
        fromCache: true,
        cacheTime: new Date(expiredCache.timestamp).toISOString(),
        isExpiredCache: true
      });
    }
    
    return NextResponse.json({ 
      memberCount: 1337, 
      error: error instanceof Error ? error.message : '無法獲取成員數量',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 
