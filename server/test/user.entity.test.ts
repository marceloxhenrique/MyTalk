import User from "../src/domain/User.entity";
import UserInMemory from "../src/infra/db/user.inmemory";

describe("User Test", () => {
  it("Should create an user", () => {
    const userInMemory = new UserInMemory();

    const data = {
      userName: "John",
      password: "1234",
      email: "john@test.com",
    };
    const user = new User("john@test.com", "1234", "John");
    const newUser = user.getData();

    expect(data.userName).toEqual(newUser.userName);
  });
});
