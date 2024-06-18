import Connection from "../../domain/services/Connection";
import User from "../../domain/user/User.entity";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export default class UserDatabaseRepository implements UserRepositoryInterface {
  constructor(private connection: Connection) {}

  async create(user: User): Promise<void> {
    await this.connection.query(
      `INSERT INTO public.user (id, user_name, password, email) values ($1, $2, $3, $4)`,
      [user.getData().id, user.getData().userName, user.getPassword(), user.getData().email]
    );
  }

  findById(userId: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await this.connection.query(`SELECT * FROM public.user WHERE email = $1`, [email]);

    if (res.length === 0) {
      return null;
    }
    const row = res[0];

    return new User(row.email, row.password, row.user_name, row.id);
  }
}
