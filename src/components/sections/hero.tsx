"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export function Hero() {
  const words = `Hi, I'm Nodir Jumaniyozov. A Software Developer who builds modern web applications with a focus
          on performance, user experience, and clean code.`;
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" /> */}

      <MaskContainer
        revealSize={350}
        idleSize={8}
        revealText={
          <p className="mx-auto max-w-4xl px-6 text-center text-4xl font-bold leading-tight text-slate-800 md:text-6xl md:leading-tight">
            I turn ideas into fast, beautiful, and scalable web experiences
            using <span className="text-blue-500">React</span>,{" "}
            <span className="text-blue-500">Next.js</span>,{" "}
            <span className="text-blue-500">TypeScript</span>, and{" "}
            <span className="text-blue-500">Tailwind CSS</span>.
          </p>
        }
        words={words}
      />
    </section>
  );
}
