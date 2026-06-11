"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import type { ChatMessage, ChatReplyPayload, VisitorInfo } from "@/types";
import { generateId } from "@/lib/uuid";

const MESSAGES_KEY = "chat_messages";

function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(MESSAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [isOpen, setIsOpen] = useState(false);
  const connectedRef = useRef(false);

  // Persist messages to sessionStorage on every change
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (connectedRef.current) return;
    connectedRef.current = true;

    const socket = connectSocket();

    socket.on("connect", () => {
      const info: VisitorInfo = {
        device: {
          browser: "",
          os: "",
          deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
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

    socket.on("chat:reply", (data: ChatReplyPayload) => {
      setMessages((prev) => {
        const updated = [...prev, {
          id: data.id,
          role: "assistant" as const,
          content: data.content,
          timestamp: data.timestamp,
        }];
        saveMessages(updated);
        return updated;
      });
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
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    getSocket().emit("chat:message", { content });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    sessionStorage.removeItem(MESSAGES_KEY);
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { messages, isOpen, toggle, sendMessage, clearMessages };
}