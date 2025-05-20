import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// 使用靜態數據
const staticDiscordData = {
  memberCount: 500, // 靜態成員數量
  guildName: "HackIt Community",
  isStatic: true,
  timestamp: new Date().toISOString()
};

export async function GET(request: NextRequest) {
  // 直接返回靜態數據
  return NextResponse.json(staticDiscordData);
} 