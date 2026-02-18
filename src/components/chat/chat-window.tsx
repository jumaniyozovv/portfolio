"use client";

import { Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { format } from "date-fns";

interface ChatWindowProps {
  messages: ChatMessage[];
  onSend: (content: string) => void;
}

export function ChatWindow({ messages, onSend }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 p-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Send a message to start chatting.
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "relative max-w-[75%] wrap-break-word whitespace-pre-wrap rounded-lg px-3 py-2",
              msg.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            <p className="text-sm">{msg.content}<span className={cn(msg.role==="user"? "text-gray-900":"text-gray-300","text-[10px]  leading-tight absolute bottom-0 right-1")}>{format(msg.timestamp,"HH:mm")}</span></p> 
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-1 w-full px-2 mx-auto flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full rounded-md bg-muted px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
        />
        <Button type="submit" size="icon" variant="secondary">
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}
