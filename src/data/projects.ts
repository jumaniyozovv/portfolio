import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "A modern portfolio built with Next.js, Tailwind CSS, and shadcn/ui featuring real-time chat and smooth animations.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Socket.io"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce application with product management, cart functionality, and payment integration.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com",
    featured: true,
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description:
      "A collaborative task management tool with real-time updates and team workspaces.",
    tech: ["Next.js", "Prisma", "WebSockets", "Redis"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: "cli-tool",
    title: "CLI Productivity Tool",
    description:
      "A command-line tool for automating development workflows and project scaffolding.",
    tech: ["Node.js", "TypeScript", "Commander.js"],
    github: "https://github.com",
    featured: false,
  },
];
