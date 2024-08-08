import { CreateUser } from "./CreateUser.usecase";
import { UserRepositoryInterface } from "../../domain/user/User.repository";
import { FindUser } from "./FindUser.usecase";
import UserLogin from "./UserLogin.usecase";
import { HttpServer } from "../../adapters/HttpServer";
import TokenService from "../../domain/services/TokenService";
import AuthenticateUser from "./AuthenticateUser";
import UserLogout from "./UserLogout";
import { UpdateUser } from "./UpdateUser.usecase";

export default class UserController {
  constructor(
    readonly userDatabaseRepository: UserRepositoryInterface,
    readonly httpServer: HttpServer,
    private tokenService: TokenService
  ) {
    httpServer.on("post", "/api/register", async (req, res) => {
      try {
        const createUser = new CreateUser(userDatabaseRepository);
        const newUser = await createUser.execute(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Email or password invalid!" });
      }
    });
    httpServer.on("post", "/api/login", async (req, res) => {
      try {
        const logUser = new UserLogin(userDatabaseRepository, tokenService);
        const output = await logUser.execute(req.body.email, req.body.password);
        if (output.user && output.token && output.refreshToken) {
          res
            .status(200)
            .cookie("MyTalk_Token", output.token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            })
            .cookie("Mytalk_Refresh_Token", output.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            })
            .json(output.user);
        } else {
          throw new Error("Error Missing Email ");
        }
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Email or password invalid" });
      }
    });

    httpServer.on("get", "/api/users/:id", async (req, res) => {
      try {
        tokenService.verifyToken(req.cookies.MyTalk_Token);
        const userId = req.params.id;
        const findUser = new FindUser(userDatabaseRepository);
        const output = await findUser.execute(userId);
        res.json(output);
      } catch (error: any) {
        if (error.message === "Token verification failed") {
          return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(404).json({ message: "User not found" });
      }
    });

    httpServer.on("get", "/api/authenticateuser", async (req, res) => {
      const token = req.cookies.MyTalk_Token;
      if (!token) {
        return;
      }
      try {
        const authenticateUser = new AuthenticateUser(tokenService, userDatabaseRepository);

        const userAuthenticated = await authenticateUser.execute(token);
        res.status(201).json(userAuthenticated);
      } catch (error) {
        console.error("An error occurred", error);
        res.status(401).json({ message: "Unauthorized" });
      }
    });

    httpServer.on("get", "/api/logout", async (req, res) => {
      try {
        const token = req.cookies.MyTalk_Token;
        if (!token || token === undefined) {
          return res.status(401).json("Unauthorized");
        }

        const userLogout = new UserLogout(tokenService);
        userLogout.execute(token);
        res
          .clearCookie("MyTalk_Token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          })
          .clearCookie("Mytalk_Refresh_Token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          })
          .status(200)
          .json({ message: "Logged out" });
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token Unauthorized" });
      }
    });

    httpServer.on("post", "/api/updateuser/:id", async (req, res) => {
      try {
        tokenService.verifyToken(req.cookies.MyTalk_Token);
        const newUserName = req.body.userName.newUserName;
        const userId = req.params.id;
        const updateUser = new UpdateUser(userDatabaseRepository);
        updateUser.execute(newUserName, userId);
        res.sendStatus(200);
      } catch (error: any) {
        if (error.message === "Token verification failed") {
          return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(404).json({ message: "User not found" });
      }
    });

    httpServer.listen(3000, () => {});
  }
}
