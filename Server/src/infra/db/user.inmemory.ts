import User from "../../domain/user/User.entity";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export default class UserInMemory implements UserRepositoryInterface {
  updateUserName(userName: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findById(userId: string): Promise<User | null> {
    const res: User[] = this.users.filter((user) => user.getData().id === userId);
    if (res.length === 0) {
      return null;
    }
    return res[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const res: User[] = this.users.filter((user) => user.getData().email === email);
    if (res.length === 0) {
      return null;
    }
    return res[0];
  }
}
