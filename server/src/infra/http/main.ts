import { routeApp } from "./routes";
import express, { Express } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app: Express = express();
const server = createServer(app);
app.use(express.json());
app.use(routeApp);

const io = new Server(server, {
  connectionStateRecovery: {},
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  try {
    console.log(`Server listening in port http://localhost:${port}`);
  } catch (error) {
    console.log(`Something went wrong error: ${error}`);
  }
});
