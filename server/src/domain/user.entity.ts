import crypto from "crypto";

export default class User {
  private id: string;
  constructor(
    private userName: string,
    private password: string,
    private email: string
  ) {
    this.id = crypto.randomUUID();
  }

  updateUserName(value: string) {
    this.userName = value;
  }

  getData() {
    const userDate = {
      id: this.id,
      userName: this.userName,
      email: this.email,
      password: this.password,
    };
    return userDate;
  }
}
