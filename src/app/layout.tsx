import { Github, Instagram, Mail, Send } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatWidget } from "@/components/chat/chat-widget";
import { FloatingDock } from "@/components/ui/floating-dock";
import { WebcamBackground } from "@/components/webcam-background";
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
  title: "Nodir Jumaniyozov — Portfolio",
  description: "Software Web Developer portfolio",
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
    title: "Telegram",
    icon: <Send className="size-full" />,
    href: "https://t.me/njumaniyozov",
  },
  {
    title: "Email",
    icon: <Mail className="size-full" />,
    href: "mail.google.com/njumaniyozov001@gmail.com",
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
        <WebcamBackground />
        <main className="relative z-10">{children}</main>
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
          <FloatingDock items={dockItems} />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
