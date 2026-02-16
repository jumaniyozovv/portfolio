"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <TextGenerateEffect
          words="Hi, I'm a Full-Stack Developer"
          className="text-4xl leading-tight md:text-6xl md:leading-tight"
        />

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          I build modern web applications with a focus on performance, user
          experience, and clean code.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        <a
          href="#about"
          className="mt-16 inline-block animate-bounce text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
