"use client";

import { motion } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils";

interface LampSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function LampSection({ title, children, className }: LampSectionProps) {
  return (
    <section className={cn("relative w-full", className)}>
      <div className="relative flex flex-col items-center overflow-hidden rounded-none pt-24">
        {/* Lamp glow effect */}
        <div className="relative z-0 flex w-full flex-1 items-center justify-center isolate">
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage:
                "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
            }}
            className="bg-gradient-to-r from-transparent via-cyan-500 to-transparent absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute w-full left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-full left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage:
                "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
            }}
            className="bg-gradient-to-r from-transparent via-cyan-500 to-transparent absolute inset-auto left-1/2 h-56 w-[30rem] [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute w-40 h-full right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-full right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          <div className="absolute top-1/2 h-48 w-full translate-y-12 bg-background blur-2xl" />
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "16rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-auto z-50 h-0.5 w-[16rem] -translate-y-[7rem] bg-cyan-400"
          />
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-50 -mt-24 text-center text-3xl font-bold tracking-tight md:text-4xl"
        >
          {title}
        </motion.h2>
      </div>

      {/* Section content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
