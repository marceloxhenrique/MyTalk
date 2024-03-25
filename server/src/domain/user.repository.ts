import User from "./user.entity.js";

export interface UserRepositoryInterface {
  insert(user: User): Promise<void>;
  findById(userId: string): Promise<User | undefined>;
}
