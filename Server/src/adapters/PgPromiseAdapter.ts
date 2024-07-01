import Connection from "../domain/services/Connection";
import pgp from "pg-promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
export default class PgPromiseAdapter implements Connection {
  private connection;
  constructor() {
    this.connection = pgp()(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
  }
  one(statements: string, params: any): Promise<any> {
    return this.connection.one(statements, params);
  }
  query(statements: string, params: any): Promise<any> {
    return this.connection.query(statements, params);
  }
  close(): Promise<void> {
    return this.connection.$pool.end();
  }
}
