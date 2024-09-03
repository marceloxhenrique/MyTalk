import Connection from "../../domain/services/Connection";
import User from "../../domain/user/User.entity";
import { UserRepositoryInterface } from "../../domain/user/User.repository";

export default class UserDatabaseRepository implements UserRepositoryInterface {
  constructor(private connection: Connection) {}

  async updateUserName(userName: string, userId: string): Promise<void> {
    const res = await this.connection.query(`UPDATE public.user SET user_name = $1 WHERE id = $2`, [
      userName,
      userId,
    ]);
    await this.connection.query(
      `UPDATE public.contact SET contact_name = $1 WHERE contact_id = $2`,
      [userName, userId]
    );
    return res;
  }

  async create(user: User): Promise<void> {
    await this.connection.query(
      `INSERT INTO public.user (id, user_name, password, email) values ($1, $2, $3, $4)`,
      [user.getData().id, user.getData().userName, user.getPassword(), user.getData().email]
    );
  }

  async findById(userId: string): Promise<User | null> {
    const res = await this.connection.query(`SELECT * FROM public.user WHERE id = $1`, [userId]);
    if (res.length === 0) {
      return null;
    }
    const row = res[0];
    return new User(row.email, row.password, row.user_name, row.id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await this.connection.query(`SELECT * FROM public.user WHERE email = $1`, [email]);
    if (res.length === 0) {
      return null;
    }
    const row = res[0];
    return new User(row.email, row.password, row.user_name, row.id);
  }

  async deleteAccount(userId: string): Promise<void> {
    await this.connection.query(`DELETE FROM public.user WHERE id = $1`, [userId]);
  }
}
