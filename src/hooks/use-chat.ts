"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import type { ChatMessage } from "@/types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const connectedRef = useRef(false);

  useEffect(() => {
    if (connectedRef.current) return;
    connectedRef.current = true;

    const socket = connectSocket();

    socket.on(
      "chat:reply",
      (data: { id: string; content: string; timestamp: string }) => {
        const reply: ChatMessage = {
          id: data.id,
          role: "assistant",
          content: data.content,
          timestamp: new Date(data.timestamp),
        };
        setMessages((prev) => [...prev, reply]);
      },
    );

    return () => {
      socket.off("chat:reply");
      disconnectSocket();
      connectedRef.current = false;
    };
  }, []);

  const sendMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const socket = getSocket();
    socket.emit("chat:message", {
      content,
      url: window.location.href,
      referrer: document.referrer || undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
    });
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { messages, isOpen, toggle, sendMessage };
}
