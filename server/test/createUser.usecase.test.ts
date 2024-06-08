import { CreateUser } from "./../src/application/CreateUser.usecase";
import { FindUser } from "../src/application/FindUser.usecase";
import UserLogin from "../src/application/UserLogin.usecase";
import UserInMemory from "../src/infra/db/user.inmemory";
import { JwtConfig } from "../src/infra/config/JwtConfig";
import JwtTokenService from "../src/infra/services/JwtTokenService";
describe("Create User ", () => {
  it("Shoudl create a user", async () => {
    const user = {
      email: "jhon@test.gmail.com",
      password: "123456",
    };

    const userInMemory = new UserInMemory();
    const createUser = new CreateUser(userInMemory);
    const newUser = await createUser.execute(user);

    expect(newUser).toBeDefined();
  });
  it("Should login a user", async () => {
    const newUser = {
      email: "jhon@test.gmail.com",
      password: "123456",
    };

    const userInMemory = new UserInMemory();
    const createUser = new CreateUser(userInMemory);
    await createUser.execute(newUser);

    const tokenService = new JwtTokenService(JwtConfig);
    const logUser = new UserLogin(userInMemory, tokenService);
    const result = await logUser.execute(newUser.email, newUser.password);
    expect(newUser.email).toEqual(result.user.email);
  });
});
