import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const newsDir = path.join(process.cwd(), 'public', 'data', 'news');
    const files = await fs.readdir(newsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const news = [];
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(newsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const newsData = JSON.parse(fileContent);
        news.push(newsData);
      } catch (error) {
        console.error(`Error reading news file ${file}:`, error);
      }
    }
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error reading news directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
