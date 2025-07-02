import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  try {
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'database'
      }
    });

    return NextResponse.json({
      databases: response.results.map(db => ({
        id: db.id,
        title: db.title?.[0]?.plain_text || 'Untitled',
        url: db.url
      }))
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}