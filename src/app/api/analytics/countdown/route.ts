import { NextResponse } from "next/server";

// Placeholder in-memory counter (will reset on redeploy / server restart)
let views = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(()=>({}));
    views += 1;
    // Log minimal event for now (replace with real analytics / DB later)
    console.log("[analytics] countdown view", { views, userAgent: (req.headers as any).get?.("user-agent"), clientSent: body?.clientTs });
    return NextResponse.json({ ok: true, views });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ views });
}
