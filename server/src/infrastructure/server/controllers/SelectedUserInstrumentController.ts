import * as express from "express";
import {
  ListSelectedUserInstrument,
  SelectUserInstrument,
  UnselectUserInstrument,
} from "../../../app/selected-user-instrument";
import { TypeormSelectedUserInstrumentRepository } from "../../repositories/TypeormSelectedUserInstrumentRepository";
import { TypeormUserInstrumentRepository } from "../../repositories/TypeormUserInstrumentRepository";

export class SelectedUserInstrumentController {
  public static async select(
    req: express.Request,
    res: express.Response,
    next
  ): Promise<void> {
    const selectedInstrumentRepo: TypeormUserInstrumentRepository = new TypeormUserInstrumentRepository();

    const userInstrumentRepo: TypeormSelectedUserInstrumentRepository = new TypeormSelectedUserInstrumentRepository();

    const useCase = new SelectUserInstrument(
      userInstrumentRepo,
      selectedInstrumentRepo
    );
    try {
      await useCase.run({ input: req.body, params: req.params });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  public static async unselect(
    req: express.Request,
    res: express.Response,
    next
  ): Promise<void> {
    const userInstrumentRepo: TypeormSelectedUserInstrumentRepository = new TypeormSelectedUserInstrumentRepository();

    const useCase = new UnselectUserInstrument(userInstrumentRepo);
    try {
      const result = await useCase.run({ input: req.body, params: req.params });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  public static async list(
    req: express.Request,
    res: express.Response,
    next
  ): Promise<void> {
    const userInstrumentRepo: TypeormSelectedUserInstrumentRepository = new TypeormSelectedUserInstrumentRepository();

    const useCase = new ListSelectedUserInstrument(userInstrumentRepo);
    try {
      const result = await useCase.run();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
