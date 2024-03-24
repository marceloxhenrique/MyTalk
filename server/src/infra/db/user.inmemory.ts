import User from "../../domain/user.entity.js";
import { UserRepositoryInterface } from "../../domain/user.repository.js";

export default class UserInMemory implements UserRepositoryInterface {
  users: User[] = [];
  async insert(user: User): Promise<void> {
    this.users.push(user);
    // console.log(this.users);
  }
  // userAlredyExist(value: User) {
  //   for (let user of this.users) {
  //     console.log(user);
  //   }
  // }
}
