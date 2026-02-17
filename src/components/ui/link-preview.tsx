"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LinkPreviewProps {
  children: React.ReactNode;
  imageSrc: string;
  className?: string;
  width?: number;
  height?: number;
}

export function LinkPreview({
  children,
  imageSrc,
  className,
  width = 256,
  height = 160,
}: LinkPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 260, damping: 20 },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 block"
          >
            <span
              className="block overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl"
              style={{ width, height }}
            >
              <Image
                src={imageSrc}
                width={width}
                height={height}
                alt="Preview"
                className="block h-full w-full object-cover"
              />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
      <span className="cursor-pointer border-b border-dashed border-cyan-400/50 font-medium text-foreground transition-colors hover:border-cyan-400 hover:text-cyan-400">
        {children}
      </span>
    </span>
  );
}
