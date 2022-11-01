import { DataSource } from "typeorm";
import { env } from "../env";

export const OrmSource: DataSource = new DataSource({
  type: "mysql",
  host: env.db.master.host,
  port: env.db.master.port,
  username: env.db.master.username,
  password: env.db.master.password,
  database: env.db.master.dbName,
  migrations: ["dist/databases/migrations/**/*{.ts,.js}"],
  migrationsTableName: "migrations",
});
