import express, { Express, Request, Response } from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import { Server } from "socket.io";
import { CreateUser } from "./application/user.usecase.js";
import UserInMemory from "./infra/db/user.inmemory.js";

const app: Express = express();
const server = createServer(app);
app.use(express.json());

const io = new Server(server, {
  connectionStateRecovery: {},
});

const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "..", "public", "index.html"));
});

const userInMemory = new UserInMemory();

app.post("/register", async (req: Request, res: Response) => {
  const user = new CreateUser(userInMemory);
  const output = await user.execute(req.body);
  res.json(output).status(200);
});

app.get("/chat.html", (req: Request, res: Response) => {
  const auth = false;
  console.log(auth);
  if (auth) {
    res.sendFile(join(__dirname, "chat.html"));
  } else {
    // res.sendFile(join(__dirname, "..", "public", "index.html"));
    res.redirect("/");
  }
});

// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("room", (data) => {
//     console.log(data);
//     const user = new CreateUser(userInMemory);
//     userInMemory.users;
//     user.execute(data);
//   });

//   socket.on("chat message", (msg) => {
//     // io.emit("chat message", msg);
//     console.log(msg);
//     console.log(userInMemory.users.map((user) => user));
//     io.emit("chat message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

server.listen(port, () => {
  try {
    console.log(`Server listening in port http://localhost:${port}`);
  } catch (error) {
    console.log(`Something went wrong error: ${error}`);
  }
});
