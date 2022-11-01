import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../databases/entities/users/user.entity";
import { env } from "../env";

export const OrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  replication: {
    master: {
      host: env.db.master.host,
      port: env.db.master.port,
      username: env.db.master.username,
      password: env.db.master.password,
      database: env.db.master.dbName,
    },
    slaves: [
      {
        host: env.db.firstSlave.host,
        port: env.db.firstSlave.port,
        username: env.db.firstSlave.username,
        password: env.db.firstSlave.password,
        database: env.db.firstSlave.dbName,
      },
    ],
  },
  logging: true,
  synchronize: false,
  migrations: ["dist/databases/migrations/**/*{.ts,.js}"],
  migrationsTableName: "migrations",
  maxQueryExecutionTime: 2000,
  entities: [User],
};

export default OrmConfig;
