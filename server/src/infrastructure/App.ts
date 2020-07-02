import { createConnection } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import CONFIG from "../config/config";
import { TypeormUserInstrumentRepository } from "./repositories/TypeormUserInstrumentRepository";
import { ExpressServer } from "./server/ExpressServer";
import { TypeormUserInstrumentEntity } from "./repositories/entities/TypeormUserInstrumentEntity";
import { TypeormSelectedUserInstrumentEntity } from "./repositories/entities/TypeormSelectedUserInstrumentEntity";

export class App {
  public server: ExpressServer;
  public config: { db: MysqlConnectionOptions; port: string };
  private db;

  constructor() {
    this.config = {
      port: CONFIG.port,
      db: {
        ...CONFIG.db,
        type: (CONFIG.db.type as any) as "mariadb",
        entities: [
          TypeormUserInstrumentEntity,
          TypeormSelectedUserInstrumentEntity,
        ],
      },
    };
  }

  public async run() {
    this.db = await createConnection(this.config.db);
    this.server = new ExpressServer(this);

    await this.server.start();
  }
}
