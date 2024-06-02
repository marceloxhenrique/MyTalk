import crypto from "crypto";

export default class User {
  private id: string;

  constructor(private email: string, private password: string, private userName?: string) {
    if (!this.validEmail(email)) {
      throw new Error("Invalid email format");
    }
    this.id = crypto.randomUUID();
  }

  updateUserName(value: string) {
    if (value.length < 1) {
      throw new Error("User name must be at least 2 characters");
    }
    this.userName = value;
  }

  private validEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  getPassword() {
    return this.password;
  }

  getData() {
    const userDate = {
      id: this.id,
      userName: this.userName,
      email: this.email,
    };
    return userDate;
  }
}
