import { CreateUser } from "../../application/CreateUser.usecase";
import { UserRepositoryInterface } from "../../domain/User.repository";
import { FindUser } from "../../application/FindUser.usecase";
import ExpressAdapter from "../../adapters/ExpressAdapter";
import UserLogin from "../../application/UserLogin.usecase";

export default class UserController {
  constructor(readonly userInMemory: UserRepositoryInterface, readonly httpserver: ExpressAdapter) {
    httpserver.on("get", "/users/:id", async (req, res) => {
      try {
        const userEmail = req.params.id;
        const findUser = new FindUser(userInMemory);
        const output = await findUser.execute(userEmail);
        res.json(output);
      } catch (error) {
        res.status(404).json({ message: "User not found" });
      }
    });

    httpserver.on("post", "/register", async (req, res) => {
      try {
        const user = new CreateUser(userInMemory);
        const output = await user.execute(req.body);
        console.log(output);
        res.json(output);
      } catch (error) {
        res.status(401).json({ message: "Email or password invalid" });
      }
    });

    httpserver.on("post", "/login", async (req, res) => {
      try {
        const logUser = new UserLogin(userInMemory);
        const output = await logUser.execute(req.body.email, req.body.password);
        console.log("login", output);
        res.status(200).json(output);
      } catch (error: any) {
        res.status(401).json({ message: "Email or password invalid" });
      }
    });
    httpserver.listen(3000);
  }
}
