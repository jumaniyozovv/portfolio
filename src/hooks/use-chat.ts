"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import type { ChatMessage, ChatReplyPayload, VisitorInfo } from "@/types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const connectedRef = useRef(false);

  useEffect(() => {
    if (connectedRef.current) return;
    connectedRef.current = true;

    const socket = connectSocket();

    // Fires once when socket successfully connects
    socket.on("connect", () => {
      const info: VisitorInfo = {
        device: {
          browser: "", // parsed server-side from User-Agent header
          os: "",
          deviceType: /Mobi|Android/i.test(navigator.userAgent)
            ? "mobile"
            : "desktop",
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
        },
        context: {
          url: window.location.href,
          referrer: document.referrer,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
        },
      };
      socket.emit("visitor:info", info);
    });

    // Fires when server pushes a reply from Telegram
    socket.on("chat:reply", (data: ChatReplyPayload) => {
      const reply: ChatMessage = {
        id: data.id,
        role: "assistant",
        content: data.content,
        timestamp: data.timestamp, // already an ISO string
      };
      setMessages((prev) => [...prev, reply]);
    });

    return () => {
      socket.off("connect");
      socket.off("chat:reply");
      disconnectSocket();
      connectedRef.current = false;
    };
  }, []);

  const sendMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id:
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Array.from(crypto.getRandomValues(new Uint8Array(16)))
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("-"),
      role: "user",
      content,
      timestamp: new Date().toISOString(), // string, not Date
    };
    setMessages((prev) => [...prev, userMessage]);

    getSocket().emit("chat:message", { content });
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { messages, isOpen, toggle, sendMessage };
}
