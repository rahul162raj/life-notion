import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(request) {

  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const blockId =  '2244a4db-cb63-80c7-85c1-e876cc2897c1'

  // 1️⃣ Calculate days remaining
  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const diffTime = endOfYear - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 2️⃣ Add a random number to make it different every call
  const randomTestValue = Math.floor(Math.random() * 1000); // 0–999

  try {
    // 2️⃣ Update the callout block
    const response = await notion.blocks.update({
      block_id: blockId,
      callout: {
        rich_text: [
          {
            type: 'text',
            text: {
              // content: `Days remaining: ${diffDays} days`,
              content: `Days remaining: ${diffDays} days | Test ID: ${randomTestValue}`,
            },
          },
        ],
      },
    });

    return NextResponse.json({
      message: 'Callout block updated!',
      daysLeft:       randomTestValue,
      blockId: response.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}