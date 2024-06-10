import User from "../src/domain/user/User.entity";

describe("User Test", () => {
  it("Should create an user", () => {
    const data = {
      userName: "John",
      password: "123456",
      email: "john@test.com",
    };
    const user = new User("john@test.com", "123456", "John");
    const newUser = user.getData();

    expect(data.userName).toEqual(newUser.userName);
  });
});
