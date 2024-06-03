import { CreateUser } from "./CreateUser.usecase";
import { UserRepositoryInterface } from "../domain/User.repository";
import { FindUser } from "./FindUser.usecase";
import UserLogin from "./UserLogin.usecase";
import { HttpServer } from "../adapters/HttpServer";

export default class UserController {
  constructor(readonly userInMemory: UserRepositoryInterface, readonly httpServer: HttpServer) {
    httpServer.on("get", "/api/users/:id", async (req, res) => {
      try {
        const userEmail = req.params.id;
        const findUser = new FindUser(userInMemory);
        const output = await findUser.execute(userEmail);
        res.json(output);
      } catch (error) {
        res.status(404).json({ message: "User not found" });
      }
    });

    httpServer.on("post", "/api/register", async (req, res) => {
      try {
        const user = new CreateUser(userInMemory);
        const output = await user.execute(req.body);
        res.status(201).json(output);
      } catch (error) {
        res.status(401).json({ message: "Email or password invalid" });
      }
    });

    httpServer.on("post", "/api/login", async (req, res) => {
      try {
        const logUser = new UserLogin(userInMemory);
        const output = await logUser.execute(req.body.email, req.body.password);
        console.log("login", output);
        res.status(200).json(output);
      } catch (error) {
        res.status(401).json({ message: "Email or password invalid" });
      }
    });
    httpServer.listen(3000, () => {});
  }
}
