import User from "./User.entity";

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  updateUserName(userName: string, userId: string): Promise<void>;
}
