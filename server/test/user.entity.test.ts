import User from "../src/domain/user.entity";

describe("User Test", () => {
  it("Should create an user", () => {
    const data = {
      userName: "John",
      password: "1234",
      email: "john@test.com",
    };
    const user = new User("John", "1234", "john@test.com");

    const newUser = user.getData();

    expect(data.userName).toEqual(newUser.userName);
  });
});
