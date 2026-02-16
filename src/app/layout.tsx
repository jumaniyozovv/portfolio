import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatWidget } from "@/components/chat/chat-widget";
import { FloatingDock } from "@/components/ui/floating-dock";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full-stack developer portfolio",
};

const dockItems = [
  {
    title: "GitHub",
    icon: <Github className="size-full" />,
    href: "https://github.com/jumaniyozovv",
  },
  {
    title: "Instagramm",
    icon: <Instagram className="size-full" />,
    href: "https://instagram.com/n.juman1yozov",
  },
  {
    title: "Email",
    icon: <Mail className="size-full" />,
    href: "mailto:hello@example.com",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <main>{children}</main>
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          <FloatingDock items={dockItems} />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
