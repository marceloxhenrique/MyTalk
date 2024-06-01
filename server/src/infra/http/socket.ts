import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServerType } from "http";

export class WebsocketConnection {
  constructor(private server: HttpServerType) {}

  execute() {
    const io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.NODE_ENV == "dev" ? ["http://127.0.0.1:5501"] : false,
        allowedHeaders: "Content-Type",
      },
    });
    io.on("connection", (socket) => {
      console.log(`User ${socket.id} Connected ✅`);
      socket.on("disconnect", () => {
        console.log(`User ${socket.id} Disconected ⛔️`);
      });
      socket.on("message", (msg: string) => {
        io.emit("message", msg);
        console.log("Message", msg);
      });
    });
    return io;
  }
}
