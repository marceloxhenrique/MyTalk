import User from "./User.entity";

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  findById(userId: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
