import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createServer } from "node:http";
import next from "next";
import { Server as SocketServer } from "socket.io";
import TelegramBot from "node-telegram-bot-api";
import { UAParser } from "ua-parser-js";
import type {
  ChatMessagePayload,
  ClientToServerEvents,
  ServerToClientEvents,
  VisitorInfo,
  VisitorSession,
} from "@/types";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 3000;

// ─── Session store ────────────────────────────────────────────────────────────

const sessions = new Map<string, VisitorSession>();
const telegramMsgToSession = new Map<number, string>();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseUA(raw: string): { browser: string; os: string } {
  const parser = new UAParser(raw);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  return {
    browser:
      [browser.name, browser.version?.split(".")[0]]
        .filter(Boolean)
        .join(" ") || "Unknown browser",
    os: [os.name, os.version].filter(Boolean).join(" ") || "Unknown OS",
  };
}
async function getLocation(ip: string): Promise<string> {
  try {
    // skip for localhost
    if (ip === "::1" || ip === "127.0.0.1") return "localhost";
    
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city`);
    const data = await res.json();
    
    return [data.city, data.regionName, data.country]
      .filter(Boolean)
      .join(", ");
  } catch {
    return "Unknown";
  }
}
async function formatVisitorCard(session: VisitorSession): Promise<string> {
  const { ip, userAgent, info } = session;
  const { browser, os } = parseUA(userAgent);
  const location = await getLocation(ip)

  const lines = [
    `🔔 New visitor — #${session.sessionId.slice(0, 8)}`,
    `─────────────────────`,
    `🌍 IP: ${ip}`,
    `📍 Location: ${location}`,
    info
      ? `🖥 ${browser} on ${os} — ${info.device.deviceType}`
      : `🖥 ${browser} on ${os}`,
    info
      ? `📐 Screen: ${info.device.screenWidth}×${info.device.screenHeight}`
      : null,
    info ? `🌐 Language: ${info.context.language}` : null,
    info ? `🕐 Timezone: ${info.context.timezone}` : null,
    info?.context.url ? `📄 Page: ${info.context.url}` : null,
    info?.context.referrer ? `↩ Referrer: ${info.context.referrer}` : null,
    `🕐 Connected: ${session.connectedAt.toLocaleTimeString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return lines;
}

function formatMessage(session: VisitorSession, content: string): string {
  return `💬 [${session.sessionId.slice(0, 8)}] #${session.messageCount}\n\n${content}`;
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // ✅ declared ONCE here, never inside createServer
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("⚠ TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
  }

  const bot = botToken ? new TelegramBot(botToken, { polling: dev }) : null;

  // ─── HTTP server ────────────────────────────────────────────────────────────

  const httpServer = createServer((req, res) => {
    // Telegram webhook endpoint (production only)
    if (req.method === "POST" && req.url === "/webhook") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          bot?.processUpdate(JSON.parse(body));
        } catch (e) {
          console.error("Webhook parse error:", e);
        }
        res.writeHead(200);
        res.end();
      });
      return;
    }

    // Everything else → Next.js
    handle(req, res);
  });

  // ─── Socket.io ──────────────────────────────────────────────────────────────

  const io = new SocketServer<ClientToServerEvents, ServerToClientEvents>(
    httpServer,
    { cors: { origin: process.env.FRONTEND_URL || "*" } },
  );

  io.on("connection", (socket) => {
    const sessionId = socket.handshake.auth.sessionId as string;
    if (!sessionId) {
      socket.disconnect();
      return;
    }

    const ip =
      (socket.handshake.headers["x-forwarded-for"] as string)
        ?.split(",")[0]
        ?.trim() || socket.handshake.address;

    const session: VisitorSession = {
      sessionId,
      socketId: socket.id,
      ip,
      userAgent: socket.handshake.headers["user-agent"] || "Unknown",
      info: null,
      messageCount: 0,
      connectedAt: new Date(),
      telegramMessageIds: new Set(),
    };

    sessions.set(sessionId, session);
    console.log(`✅ Connected: session=${sessionId.slice(0, 8)} ip=${ip}`);

    socket.on("visitor:location", async (data) => {
  const { latitude, longitude, accuracy } = data;
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  if (!bot || !chatId) return;

  try {
    await bot.sendMessage(
      chatId,
      `📍 Live location (±${Math.round(accuracy)}m)\n${mapsUrl}`
    );
    // or send as a Telegram location pin:
    await bot.sendLocation(chatId, latitude, longitude);
  } catch (err) {
    console.error("Failed to send location:", err);
  }
});

    socket.on("visitor:info", async (data: VisitorInfo) => {
      session.info = data;
      if (!bot || !chatId) return;

      try {
        const sent = await bot.sendMessage(chatId, await formatVisitorCard(session));
        session.telegramMessageIds.add(sent.message_id);
        telegramMsgToSession.set(sent.message_id, sessionId);
      } catch (err) {
        console.error("Failed to send visitor card:", err);
      }
    });

    socket.on("chat:message", async (data: ChatMessagePayload) => {
      if (!data.content?.trim()) return;

      session.messageCount += 1;

      if (!bot || !chatId) return;

      if (session.messageCount === 1 && !session.info) {
        try {
          const card = await bot.sendMessage(
            chatId,
            await  formatVisitorCard(session),
          );
          session.telegramMessageIds.add(card.message_id);
          telegramMsgToSession.set(card.message_id, sessionId);
        } catch (err) {
          console.error("Failed to send late visitor card:", err);
        }
      }

      try {
        const sent = await bot.sendMessage(
          chatId,
          formatMessage(session, data.content),
        );
        session.telegramMessageIds.add(sent.message_id);
        telegramMsgToSession.set(sent.message_id, sessionId);
      } catch (err) {
        console.error("Failed to send message to Telegram:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Disconnected: session=${sessionId.slice(0, 8)}`);
      for (const msgId of session.telegramMessageIds) {
        telegramMsgToSession.delete(msgId);
      }
      sessions.delete(sessionId);
    });
  });

  // ─── Telegram reply routing ──────────────────────────────────────────────────

  if (bot) {
    bot.on("message", (msg) => {
      if (!msg.reply_to_message || !msg.text) return;

      const sessionId = telegramMsgToSession.get(
        msg.reply_to_message.message_id,
      );
      if (!sessionId) return;

      const session = sessions.get(sessionId);
      if (!session) return;

      const socket = io.sockets.sockets.get(session.socketId);
      if (!socket) return;

      socket.emit("chat:reply", {
        id: crypto.randomUUID(),
        role: "assistant",
        content: msg.text,
        timestamp: new Date().toISOString(),
      });
    });
  }

  // ─── Start ───────────────────────────────────────────────────────────────────

  httpServer.listen(port, () => {
    console.log(`🚀 Ready on http://${hostname}:${port}`);
  });
});
