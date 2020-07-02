import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import { App } from "../App";
import * as errorHandler from "./errorHandler";
import { UserInstrumentController } from "./controllers/UserInstrumentController";
import { SelectedUserInstrumentController } from "./controllers/SelectedUserInstrumentController";

export class ExpressServer {
  app: App;
  express: any;

  constructor(app: App) {
    this.app = app;

    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  public async start(): Promise<void> {
    await new Promise((resolve, reject) => {
      this.express.listen(Number(this.app.config.port), (err) => {
        if (err) {
          return reject();
        }

        console.log(`Server is listening on ${this.app.config.port}`);
        resolve();
      });
    });
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use("/api", this.getApiRoutes());
  }

  private getApiRoutes(): express.Router {
    const router: express.Router = express.Router();

    // User Instrument
    router.get("/user-instrument", UserInstrumentController.list);
    router.delete(
      "/user-instrument/:instrumentId",
      UserInstrumentController.delete
    );
    router.post("/user-instrument", UserInstrumentController.add);

    // Selected user instrument
    router.get("/selected-instrument", SelectedUserInstrumentController.list);
    router.delete(
      "/selected-instrument/:instrumentId",
      SelectedUserInstrumentController.unselect
    );
    router.put(
      "/selected-instrument/:instrumentId",
      SelectedUserInstrumentController.select
    );

    return router;
  }

  private catchErrors(): void {
    // this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.errorHandlerMiddleware);
  }
}
