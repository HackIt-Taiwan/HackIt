import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

// 改為使用靜態生成，允許緩存
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 每小時重新驗證一次（3600秒）

// 緩存路徑和文件名
const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'discord-members.json');
const CACHE_EXPIRY = 60 * 60 * 1000; // 緩存有效期：1小時（毫秒）

// 定義緩存數據類型
interface CacheData {
  memberCount: number;
  guildName: string;
  timestamp: number;
  [key: string]: any;
}

// 檢查並創建緩存目錄
if (!fs.existsSync(CACHE_DIR)) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.error('無法創建緩存目錄:', error);
  }
}

// 讀取緩存數據
function getCachedData(): CacheData | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) as CacheData;
      
      // 檢查緩存是否過期
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

// 保存數據到緩存
function saveCacheData(data: Record<string, any>): void {
  try {
    // 添加緩存時間戳
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
  // 檢查是否有強制刷新參數
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('force') === 'true';
  
  // 如果不是強制刷新，嘗試獲取緩存
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
  
  // 如果緩存不存在或已過期，從Discord API獲取數據
  try {
    // 需要在環境變數中設置 DISCORD_BOT_TOKEN 和 DISCORD_SERVER_ID
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
    
    // 嘗試使用/guilds/{guild.id}?with_counts=true 端點獲取近似成員數量
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
    
    // 保存數據到緩存
    saveCacheData(result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('獲取Discord成員數量失敗:', error);
    
    // 如果API請求失敗，嘗試使用可能過期的緩存作為後備
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