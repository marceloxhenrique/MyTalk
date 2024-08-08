import { FindUser } from "./../src/application/user/FindUser.usecase";
import { CreateUser } from "../src/application/user/CreateUser.usecase";
import UserLogin from "../src/application/user/UserLogin.usecase";
import UserInMemory from "../src/infra/db/user.inmemory";
import { JwtConfig } from "../src/infra/config/JwtConfig";
import JwtTokenService from "../src/infra/services/JwtTokenService";
describe("Create User ", () => {
  it("Should create a user", async () => {
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
  it("Should get an user by id", async () => {
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

    const findUser = new FindUser(userInMemory);

    const userById = await findUser.execute(result.user.id!);

    expect(userById?.getData().id).toEqual(result.user.id);
  });
});
