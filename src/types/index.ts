export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
}

export interface VisitorLocation {
  latitude: number
  longitude: number
  accuracy: number  // meters
}

// types.ts (frontend)
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ← ISO string, not Date
}
// ─── Visitor device / browser info (sent from browser on connect) ────────────

export interface VisitorDevice {
  browser: string; // "Chrome 124"
  os: string; // "Windows 11"
  deviceType: "desktop" | "mobile" | "tablet" | "unknown";
  screenWidth: number;
  screenHeight: number;
}

export interface VisitorContext {
  url: string; // current page URL
  referrer: string; // where they came from (empty string if direct)
  timezone: string; // "Asia/Tashkent"
  language: string; // "en-US"
}

// Full visitor info payload — sent once as "visitor:info" event on connect
export interface VisitorInfo {
  device: VisitorDevice;
  context: VisitorContext;
}

// ─── Chat message (sent from browser as "chat:message") ──────────────────────

export interface ChatMessagePayload {
  content: string;
}

// ─── Events emitted TO the browser ───────────────────────────────────────────

export interface ChatReplyPayload {
  id: string;
  role: "assistant";
  content: string;
  timestamp: string;
}

// ─── Internal session state ───────────────────────────────────────────────────

export interface VisitorSession {
  sessionId: string;
  socketId: string;
  ip: string;
  userAgent: string; // raw UA string from headers
  info: VisitorInfo | null; // null until "visitor:info" arrives
  messageCount: number;
  connectedAt: Date;
  // telegram message IDs sent for this session (for reply routing)
  telegramMessageIds: Set<number>;
}

// ─── Socket.io event map (type-safe emit/on) ─────────────────────────────────

export interface ClientToServerEvents {
  "visitor:location": (data: VisitorLocation) => void
  "visitor:info": (data: VisitorInfo) => void;
  "chat:message": (data: ChatMessagePayload) => void;
}

export interface ServerToClientEvents {
  "chat:reply": (data: ChatReplyPayload) => void;
}
