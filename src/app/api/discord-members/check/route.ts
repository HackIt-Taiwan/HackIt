import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

// Cache file paths.
const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'discord-members.json');

export async function GET(request: NextRequest) {
  try {
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;
    
    // Check for a cache file.
    const cacheStatus = {
      cacheExists: fs.existsSync(CACHE_FILE),
      cacheData: null as any,
      cacheAge: null as null | string
    };
    
    // Read cache info when available.
    if (cacheStatus.cacheExists) {
      try {
        const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
        if (cacheData.timestamp) {
          const ageInMs = Date.now() - cacheData.timestamp;
          const seconds = Math.floor(ageInMs / 1000) % 60;
          const minutes = Math.floor(ageInMs / 1000 / 60) % 60;
          const hours = Math.floor(ageInMs / 1000 / 60 / 60) % 24;
          const days = Math.floor(ageInMs / 1000 / 60 / 60 / 24);
          let ageString = '';
          if (days > 0) ageString += `${days}天`;
          if (hours > 0) ageString += `${hours}小時`;
          if (minutes > 0) ageString += `${minutes}分`;
          if (seconds > 0 || ageString === '') ageString += `${seconds}秒`;
          cacheStatus.cacheAge = ageString;
          cacheStatus.cacheData = {
            memberCount: cacheData.memberCount,
            guildName: cacheData.guildName,
            timeCreated: new Date(cacheData.timestamp).toISOString()
          };
        }
      } catch (error) {
        cacheStatus.cacheData = { error: 'Unable to parse cache file' };
      }
    }
    
    // Validate environment variables.
    const configStatus = {
      hasToken: !!DISCORD_BOT_TOKEN,
      hasServerId: !!DISCORD_SERVER_ID,
      tokenLength: DISCORD_BOT_TOKEN ? DISCORD_BOT_TOKEN.length : 0,
      tokenStartsWith: DISCORD_BOT_TOKEN ? DISCORD_BOT_TOKEN.substring(0, 5) + '...' : '',
      serverIdLength: DISCORD_SERVER_ID ? DISCORD_SERVER_ID.length : 0
    };
    
    if (!DISCORD_BOT_TOKEN || !DISCORD_SERVER_ID) {
      return NextResponse.json({
        status: 'error',
        message: '缺少Discord配置',
        config: configStatus,
        cache: cacheStatus
      }, { status: 400 });
    }
    
    // Validate Discord Bot token.
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        status: 'error',
        message: 'Discord Bot Token無效',
        apiResponse: {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        },
        config: configStatus,
        cache: cacheStatus
      }, { status: 400 });
    }
    
    const botData = await response.json();
    
    // Verify access to the guild.
    const guildResponse = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_SERVER_ID}`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`
      }
    });
    
    if (!guildResponse.ok) {
      const errorText = await guildResponse.text();
      return NextResponse.json({
        status: 'warning',
        message: '機器人無法訪問指定的Discord伺服器',
        botInfo: {
          username: botData.username,
          id: botData.id
        },
        apiResponse: {
          status: guildResponse.status,
          statusText: guildResponse.statusText,
          error: errorText
        },
        config: configStatus,
        cache: cacheStatus
      }, { status: 400 });
    }
    
    const guildData = await guildResponse.json();
    
    return NextResponse.json({
      status: 'success',
      message: 'Discord配置有效',
      botInfo: {
        username: botData.username,
        id: botData.id
      },
      guildInfo: {
        name: guildData.name,
        id: guildData.id,
        memberCount: guildData.approximate_member_count || guildData.member_count
      },
      config: configStatus,
      cache: cacheStatus
    });
    
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : '未知錯誤',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 
