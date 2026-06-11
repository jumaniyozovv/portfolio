/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import { io, type Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@/types";

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: AppSocket | null = null;

function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let id = sessionStorage.getItem("chat_session_id");
  if (!id) {
    // fallback for browsers without crypto.randomUUID
    id =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("-");
    sessionStorage.setItem("chat_session_id", id);
  }
  return id;
}

export function connectSocket(): AppSocket {
  if (socket?.connected) return socket;

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    auth: { sessionId: getSessionId() },
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔌 Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("🔌 Connection error:", err.message);
  });

  return socket;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}

export function getSocket(): AppSocket {
  if (!socket)
    throw new Error("Socket not initialized — call connectSocket first");
  return socket;
}
