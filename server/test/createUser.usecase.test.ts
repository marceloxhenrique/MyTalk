import { FindUser } from "../src/application/FindUser.usecase";
import UserLogin from "../src/application/UserLogin.usecase";
import { UserRepositoryInterface } from "../src/domain/User.repository";
import UserInMemory from "../src/infra/db/user.inmemory";
import { CreateUser } from "../src/application/CreateUser.usecase";
describe("Create User ", () => {
  it("Shoudl create a user", async () => {
    const user = {
      email: "jhon@test.gmail.com",
      password: "123456",
    };

    const userInMemory: UserRepositoryInterface = new UserInMemory();
    const createUser: CreateUser = new CreateUser(userInMemory);
    await createUser.execute(user);

    const findUser: FindUser = new FindUser(userInMemory);
    const output = await findUser.execute(user.email);
    expect(output?.email).toEqual(user.email);
  });
  it("Should login a user", async () => {
    const user1 = {
      email: "jhon@test.gmail.com",
      password: "123456",
    };

    const userInMemory = new UserInMemory();
    const createUser = new CreateUser(userInMemory);
    await createUser.execute(user1);

    const user = {
      email: "jhon@test.gmail.com",
      password: "123456",
    };

    const logUser = new UserLogin(userInMemory);
    const result = await logUser.execute(user.email, user.password);
    expect(user1.email).toEqual(result.email);
  });
});
