import Connection from "../domain/services/Connection";
import pgp from "pg-promise";

const { DB_CONNECTION } = process.env;
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
export default class PgPromiseAdapter implements Connection {
  private connection;
  constructor() {
    this.connection = pgp()(`${DB_CONNECTION}`);
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
