import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServerType } from "http";

export class WebsocketConnection {
  listOfUser: { userEmail: string; userId: string; socketId: string }[] = [];
  constructor(private server: HttpServerType) {}
  execute() {
    const io = new SocketIOServer(this.server, {
      cors: {
        origin: process.env.NODE_ENV == "dev" ? [`${process.env.FRONT_END_URL}`] : false,
        allowedHeaders: "Content-Type",
      },
    });
    io.on("connection", (socket) => {
      console.log(`User ${socket.id} Connected ✅`);
      socket.on("disconnect", () => {
        const newList = this.listOfUser.filter((item) => item.socketId != socket.id);
        this.listOfUser = newList;
        io.emit("listOfUsers", this.listOfUser);
        console.log(`User ${socket.id} Disconected ⛔️`);
      });

      socket.on("registerUser", (user: { userEmail: string; userId: string }) => {
        this.listOfUser.push({ ...user, socketId: socket.id });
        io.emit("listOfUsers", this.listOfUser);
      });

      socket.on("joinRoom", ({ userId, receiverId }) => {
        const roomName = [userId, receiverId].sort().join("-");
        socket.join(roomName);
      });

      socket.on("leaveRoom", ({ userId, receiverId }) => {
        const roomName = [userId, receiverId].sort().join("-");
        socket.leave(roomName);
      });

      socket.on(
        "privateMessages",
        (msg: { senderId: string; receiverId: string; content: string }) => {
          const { senderId, receiverId } = msg;
          const roomName = [senderId, receiverId].sort().join("-");
          io.to(roomName).emit("private_message", msg);
        }
      );
    });
    return io;
  }
}
