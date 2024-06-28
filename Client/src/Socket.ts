import { io } from "socket.io-client";

const URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? "URL to Production"
    : "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false,
});
