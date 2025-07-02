import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  // 👉 Log what you get
  console.log('Got Notion webhook payload:', JSON.stringify(body, null, 2));

  // ✅ Check for verification_token
  if (body.verification_token) {
    console.log('Verification Token:', body.verification_token);
  }

  return NextResponse.json({ ok: true });
}
