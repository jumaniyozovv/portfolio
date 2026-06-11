import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "A modern portfolio built with Next.js, Tailwind CSS, and shadcn/ui featuring real-time chat and smooth animations.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Socket.io"],
    github: "https://github.com/jumaniyozovv/portfolio",
    featured: true,
  },
  {
    id: "day off",
    title: "Day Off with min requirments",
    description:
      "React web app for getting day off. Uses local storage to store requests",
    tech: ["React", "tailwindcss", "shadcn ui"],
    github: "https://github.com/jumaniyozovv/dayoff",
    featured: true,
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description:
      "A collaborative task management tool with real-time updates and team workspaces.",
    tech: ["Next.js", "Prisma", "WebSockets", "Redis", "docker"],
    github: "https://github.com/jumaniyozovv/mms",
    featured: true,
  },
  {
    id: "expo",
    title: "Expo app for booking products",
    description:
      "A command-line tool for automating development workflows and project scaffolding.",
    tech: ["expo", "TypeScript", "Nativewind"],
    github: "https://github.com/jumaniyozovv/expo",
    featured: true,
  },
];
