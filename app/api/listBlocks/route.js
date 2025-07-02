import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(request) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ error: 'pageId parameter is required' }, { status: 400 });
  }

  try {
    const response = await notion.blocks.children.list({
      block_id: pageId
    });

    return NextResponse.json({
      blocks: response.results.map(block => ({
        id: block.id,
        type: block.type,
        content: block[block.type]?.rich_text?.[0]?.plain_text || 'No text content'
      }))
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}