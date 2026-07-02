"use client";

import { Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";

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
              "max-w-[85%] w-fit wrap-break-word whitespace-pre-wrap rounded-lg px-2 py-1",
              msg.role === "user"
                ? "ml-auto bg-card text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            <div className="flex gap-2 items-end justify-between">
              <p className="text-sm text-muted-foreground">{msg.content}</p>
              <span className="text-muted-foreground/70 text-[10px] leading-1">
                {format(msg.timestamp, "HH:mm")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-1 w-full px-2 mx-auto flex items-center gap-2"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full min-h-0 rounded-4xl bg-muted/15 px-3 py-1 text-sm outline-none placeholder:text-muted-foreground ring-1"
        />
        <Button
          type="submit"
          size="icon"
          variant="secondary"
          className="rounded-full flex items-center justify-center size-8"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}
