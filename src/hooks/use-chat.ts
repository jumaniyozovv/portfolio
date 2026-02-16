"use client";

import { useCallback, useState } from "react";
import type { ChatMessage } from "@/types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // TODO: Send via socket.io and handle response
    // For now, simulate a response
    setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Thanks for your message! Chat backend coming soon.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { messages, isOpen, toggle, sendMessage };
}
