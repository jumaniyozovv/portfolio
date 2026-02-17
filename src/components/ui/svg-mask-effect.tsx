"use client";

import {
  useRef,
  useState,
  useEffect,
  useId,
  type ReactNode,
} from "react";
import { frame, motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MaskContainerProps {
  children: ReactNode;
  revealText: ReactNode;
  className?: string;
  revealSize?: number;
  idleSize?: number;
}

export function MaskContainer({
  children,
  revealText,
  className,
  revealSize = 300,
  idleSize = 1,
}: MaskContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const maskId = useId();

  const springConfig = { damping: 25, stiffness: 200 };
  const maskCx = useSpring(0, springConfig);
  const maskCy = useSpring(0, springConfig);
  const maskR = useSpring(idleSize, { damping: 30, stiffness: 180 });

  useEffect(() => {
    maskR.set(isHovered ? revealSize : idleSize);
  }, [isHovered, revealSize, idleSize, maskR]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setDimensions({ width, height });
    };
    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      frame.read(() => {
        const rect = el.getBoundingClientRect();
        maskCx.set(e.clientX - rect.left);
        maskCy.set(e.clientY - rect.top);
      });
    };

    el.addEventListener("pointermove", handlePointerMove);
    return () => el.removeEventListener("pointermove", handlePointerMove);
  }, [maskCx, maskCy]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full", className)}
    >
      {/* Default text layer — visible outside the mask */}
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>

      {/* Reveal layer — clipped by the SVG circle mask */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            <motion.circle
              cx={maskCx}
              cy={maskCy}
              r={maskR}
              fill="white"
            />
          </mask>
        </defs>
        <foreignObject
          width={dimensions.width}
          height={dimensions.height}
          mask={`url(#${maskId})`}
        >
          <div
            className="flex h-full w-full items-center justify-center bg-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ pointerEvents: "auto" }}
          >
            {revealText}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
