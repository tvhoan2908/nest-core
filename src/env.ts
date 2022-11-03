import * as dotenv from "dotenv";
import * as path from "path";

const dotenvFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({
  path: path.join(process.cwd(), dotenvFile),
});

export const env = {
  node: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  db: {
    master: {
      type: "mysql",
      host: process.env.MASTER_DB_HOST || "localhost",
      port: process.env.MASTER_DB_PORT ? +process.env.MASTER_DB_PORT : 3306,
      username: process.env.MASTER_DB_USERNAME || "root",
      password: process.env.MASTER_DB_PASSWORD || "123456",
      dbName: process.env.MASTER_DB_NAME || "nest_core_core",
    },
    firstSlave: {
      host: process.env.SLAVE_FIRST_DB_HOST || "localhost",
      port: process.env.SLAVE_FIRST_DB_PORT ? +process.env.SLAVE_FIRST_DB_PORT : 3306,
      username: process.env.SLAVE_FIRST_DB_USERNAME || "root",
      password: process.env.SLAVE_FIRST_DB_PASSWORD || "123456",
      dbName: process.env.SLAVE_FIRST_DB_NAME || "nest_core_core",
    },
  },
  logFoler: process.env.LOG_FOLDER || "logs/",
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
