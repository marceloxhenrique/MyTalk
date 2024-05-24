import express, { Request, Response, Express } from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import { CreateUser } from "../../application/createUser.usecase";
import UserInMemory from "../db/user.inmemory";
import { FindUser } from "../../application/findUser.usecase";

export const routeApp = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

routeApp.use(express.static(path.join(__dirname, "../../../", "public")));

routeApp.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "../../../", "public", "index.html"));
});

routeApp.get("/chat.html", (req: Request, res: Response) => {
  const auth = true;
  console.log(auth);
  if (auth) {
    res.sendFile(join(__dirname, "chat.html"));
  } else {
    // res.sendFile(join(__dirname, "..", "public", "index.html"));
    res.redirect("/");
  }
});
const userInMemory = new UserInMemory();

routeApp.get("/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  console.log(userId);
  const findUser = new FindUser(userInMemory);
  const output = await findUser.execute(userId);
  console.log(output);
  res.json(output);
});

routeApp.post("/register", async (req: Request, res: Response) => {
  const user = new CreateUser(userInMemory);
  const output = await user.execute(req.body);
  res.json(output);
});
