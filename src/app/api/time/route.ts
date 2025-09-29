import { NextResponse } from "next/server";

// Endpoint menyediakan waktu server (UTC ms) agar countdown tidak tergantung jam perangkat
export async function GET() {
  const res = NextResponse.json({ now: Date.now() });
  res.headers.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.headers.set('pragma', 'no-cache');
  res.headers.set('expires', '0');
  return res;
}
