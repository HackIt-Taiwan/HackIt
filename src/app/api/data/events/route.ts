import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const eventsDir = path.join(process.cwd(), 'public', 'data', 'events');
    const files = await fs.readdir(eventsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const events = [];
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(eventsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const eventData = JSON.parse(fileContent);
        events.push(eventData);
      } catch (error) {
        console.error(`Error reading event file ${file}:`, error);
      }
    }
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error reading events directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
