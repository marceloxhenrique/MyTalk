import { CreateUser } from "./CreateUser.usecase";
import { UserRepositoryInterface } from "../domain/User.repository";
import { FindUser } from "./FindUser.usecase";
import UserLogin from "./UserLogin.usecase";
import { HttpServer } from "../adapters/HttpServer";
import TokenService from "../domain/services/TokenService";

export default class UserController {
  constructor(
    readonly userInMemory: UserRepositoryInterface,
    readonly httpServer: HttpServer,
    private tokenService: TokenService
  ) {
    httpServer.on("post", "/api/register", async (req, res) => {
      try {
        const createUser = new CreateUser(userInMemory);
        const newUser = await createUser.execute(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(401).json({ message: "Email or password invalid" });
      }
    });
    httpServer.on("post", "/api/login", async (req, res) => {
      try {
        const logUser = new UserLogin(userInMemory, tokenService);
        const output = await logUser.execute(req.body.email, req.body.password);
        if (output.user && output.token && output.refreshToken) {
          res
            .status(200)
            .cookie("MyTalk_Token", output.token, {
              httpOnly: true,
              secure: true,
              credentials: true,
              sameSite: "strict",
            })
            .cookie("Mytalk_Refresh_Token", output.refreshToken, {
              httpOnly: true,
              secure: true,
              credentials: true,
              sameSite: "strict",
            })
            .json(output.user);
        } else {
          throw new Error("Error Missing Email ");
        }
      } catch (error) {
        res.status(401).json({ message: "Email or password invalid" });
      }
    });

    httpServer.on("get", "/api/users/:id", async (req, res) => {
      try {
        const userId = req.params.id;
        const findUser = new FindUser(userInMemory);
        const output = await findUser.execute(userId);
        res.json(output);
      } catch (error) {
        res.status(404).json({ message: "User not found" });
      }
    });

    httpServer.listen(3000, () => {});
  }
}
