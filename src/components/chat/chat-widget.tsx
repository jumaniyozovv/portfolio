"use client";

import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "@/components/chat/chat-window";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const { messages, isOpen, toggle, sendMessage } = useChat();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat panel */}
      <div
        className={cn(
          "mb-4 flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl transition-all duration-300",
          isOpen
            ? "h-[420px] w-[340px] opacity-100"
            : "pointer-events-none h-0 w-0 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-semibold">Chat</span>
          <button
            type="button"
            onClick={toggle}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
        <ChatWindow messages={messages} onSend={sendMessage} />
      </div>

      {/* Floating button */}
      <button
        type="button"
        onClick={toggle}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
