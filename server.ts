import { createServer } from "node:http";
import next from "next";
import { Server as SocketServer } from "socket.io";
import TelegramBot from "node-telegram-bot-api";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Session tracking
const sessionToSocket = new Map<string, string>(); // sessionId → socketId
const telegramMsgToSession = new Map<number, string>(); // telegramMsgId → sessionId
const sessionMessageCount = new Map<string, number>(); // sessionId → message count

app.prepare().then(() => {
  const httpServer = createServer(handle);

  const io = new SocketServer(httpServer, {
    cors: { origin: "*" },
  });

  // Telegram bot setup
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn(
      "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — chat will work without Telegram forwarding",
    );
  }

  const bot = botToken ? new TelegramBot(botToken, { polling: true }) : null;

  // Handle replies from Telegram
  if (bot) {
    bot.on("message", (msg) => {
      // Only process replies to bot messages (i.e. your replies in Telegram)
      if (!msg.reply_to_message || !msg.text) return;

      const repliedToId = msg.reply_to_message.message_id;
      const sessionId = telegramMsgToSession.get(repliedToId);
      if (!sessionId) return;

      const socketId = sessionToSocket.get(sessionId);
      if (!socketId) return;

      const socket = io.sockets.sockets.get(socketId);
      if (!socket) return;

      socket.emit("chat:reply", {
        id: crypto.randomUUID(),
        role: "assistant",
        content: msg.text,
        timestamp: new Date().toISOString(),
      });
    });
  }

  // Socket.io connection handling
  io.on("connection", (socket) => {
    const sessionId = socket.handshake.auth.sessionId as string;
    if (!sessionId) {
      socket.disconnect();
      return;
    }

    sessionToSocket.set(sessionId, socket.id);
    console.log(`Client connected: session=${sessionId} socket=${socket.id}`);

    socket.on(
      "chat:message",
      async (data: {
        content: string;
        url?: string;
        referrer?: string;
        timezone?: string;
        language?: string;
      }) => {
        if (!bot || !chatId) return;

        const count = (sessionMessageCount.get(sessionId) ?? 0) + 1;
        sessionMessageCount.set(sessionId, count);

        const ip =
          socket.handshake.headers["x-forwarded-for"] ||
          socket.handshake.address;
        const ua = socket.handshake.headers["user-agent"] || "Unknown";

        // First message from this session — include full context
        const meta =
          count === 1
            ? [
                `\n\n--- Visitor Info ---`,
                `IP: ${ip}`,
                `UA: ${ua}`,
                data.url ? `Page: ${data.url}` : null,
                data.referrer ? `Referrer: ${data.referrer}` : null,
                data.timezone ? `TZ: ${data.timezone}` : null,
                data.language ? `Lang: ${data.language}` : null,
              ]
                .filter(Boolean)
                .join("\n")
            : "";

        const text = `💬 [${sessionId.slice(0, 8)}] #${count}\n\n${data.content}${meta}`;

        try {
          const sent = await bot.sendMessage(chatId, text);
          telegramMsgToSession.set(sent.message_id, sessionId);
        } catch (err) {
          console.error("Failed to send to Telegram:", err);
        }
      },
    );

    socket.on("disconnect", () => {
      console.log(`Client disconnected: session=${sessionId}`);
      // Keep session mapping alive so Telegram replies still work
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
