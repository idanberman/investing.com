import * as dotenv from "dotenv";
import { DatabaseType } from "typeorm";
dotenv.config();

export default {
  port: process.env.PORT || "3001",
  db: {
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
  },
};
