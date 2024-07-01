import fs from "fs";
import pg from "pg";

class Migrate {
  constructor() {}
  async migrate() {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    const client = new pg.Client({
      host: DB_HOST,
      port: +DB_PORT!,
      user: DB_USER,
      password: DB_PASSWORD,
      database: "postgres",
    });

    try {
      await client.connect();
      await client.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
      await client.query(`CREATE DATABASE ${DB_NAME}`);
    } catch (error) {
      console.log("UNABLE TO RUN MIGRATION! ⛔️", error);
    } finally {
      await client.end();
    }

    const newClient = new pg.Client({
      host: DB_HOST,
      port: +DB_PORT!,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    try {
      await newClient.connect();
      const sql = fs.readFileSync("./db.sql", "utf-8");
      await newClient.query(sql);
      console.log("MIGRATION SUCCESSFULLY DONE! ✅");
    } catch (error) {
      console.log("UNABLE TO RUN MIGRATION! ⛔️", error);
    } finally {
      await newClient.end();
    }
  }
}

try {
  new Migrate().migrate();
} catch (error) {
  console.log("UNABLE TO RUN MIGRATION! ⛔️", error);
}
