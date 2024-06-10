import crypto from "crypto";
import Contact from "../contact/Contact.entity";

export default class User {
  private id: string;
  private contacts: Contact[] | null = [];
  constructor(private email: string, private password: string, private userName?: string) {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }
    this.isValidPassword(password);
    this.id = crypto.randomUUID();
  }

  updateUserName(value: string) {
    if (value.length < 1) {
      throw new Error("User name must be at least 2 characters");
    }
    this.userName = value;
  }

  private isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  private isValidPassword(password: string) {
    if (password.length < 5) {
      throw new Error("Invalid password length");
    }
    return;
  }

  getPassword() {
    return this.password;
  }

  getData() {
    const userData = {
      id: this.id,
      userName: this.userName,
      email: this.email,
    };
    return userData;
  }
}
