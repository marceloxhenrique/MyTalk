import User from "../../domain/user.entity.js";
import { UserRepositoryInterface } from "../../domain/user.repository.js";

export default class UserInMemory implements UserRepositoryInterface {
  users: User[] = [];
  async insert(user: User): Promise<void> {
    this.users.push(user);
    console.log(this.users);
  }
  async findById(userId: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.getData().id === userId);
    if (!user) return;
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.getData().email === email);
    return user;
  }
  // userAlredyExist(value: User) {
  //   for (let user of this.users) {
  //     console.log(user);
  //   }
  // }
}
