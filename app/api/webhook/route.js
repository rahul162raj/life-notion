import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  // This handles the verification handshake
  if (body.challenge) {
    return NextResponse.json({ challenge: body.challenge });
  }

  // Otherwise handle normal events
  console.log('Got Notion event:', body);

  return NextResponse.json({ ok: true });
}