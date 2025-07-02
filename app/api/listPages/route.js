import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  try {
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      }
    });

    return NextResponse.json({
      pages: response.results.map(page => ({
        id: page.id,
        title: page.properties?.title?.title?.[0]?.plain_text || 'Untitled',
        url: page.url
      }))
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}