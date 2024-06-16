import User from "../../domain/user/User.entity";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export default class UserInMemory implements UserRepositoryInterface {
  users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findById(userId: string): Promise<User[] | null> {
    const user: User[] = this.users.filter((user) => user.getData().id === userId);
    return user;
  }

  async findByEmail(email: string): Promise<User[] | null> {
    const user: User[] = this.users.filter((user) => user.getData().email === email);
    return user;
  }
}
