import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const podcastsDir = path.join(process.cwd(), 'public', 'data', 'podcasts', 'events');
    const files = await fs.readdir(podcastsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const podcasts = [];
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(podcastsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const podcastData = JSON.parse(fileContent);
        podcasts.push(podcastData);
      } catch (error) {
        console.error(`Error reading podcast file ${file}:`, error);
      }
    }
    
    return NextResponse.json(podcasts);
  } catch (error) {
    console.error('Error reading podcasts directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
