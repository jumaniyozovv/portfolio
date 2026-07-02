// app/api/telegram/send-recording/route.ts
import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // your own chat/channel id, not the visitor's

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json({ error: "Bot not configured" }, { status: 500 });
  }

  const incomingFormData = await req.formData();
  const video = incomingFormData.get("video") as File | null;

  if (!video) {
    return NextResponse.json({ error: "No video provided" }, { status: 400 });
  }

  const telegramFormData = new FormData();
  telegramFormData.append("chat_id", CHAT_ID);
  telegramFormData.append("video", video, video.name);

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendVideo`,
    {
      method: "POST",
      body: telegramFormData,
    },
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}