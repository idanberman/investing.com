import * as express from "express";
import { AddUserInstrument } from "../../../app/user-instrument/AddUserInstrument";
import { DeleteUserInstrument } from "../../../app/user-instrument/DeleteUserInstrument";
import { ListUserInstrument } from "../../../app/user-instrument/ListUserInstrument";
import { TypeormUserInstrumentRepository } from "../../repositories/TypeormUserInstrumentRepository";

export class UserInstrumentController {
  public static async add(
    req: express.Request,
    res: express.Response,
    next
  ): Promise<void> {
    const repo: TypeormUserInstrumentRepository = new TypeormUserInstrumentRepository();

    const useCase = new AddUserInstrument(repo);
    try {
      const result = await useCase.run({ input: req.body, params: req.params });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    req: express.Request,
    res: express.Response,
    next
  ): Promise<void> {
    const repo: TypeormUserInstrumentRepository = new TypeormUserInstrumentRepository();

    const useCase = new DeleteUserInstrument(repo);
    try {
      const result = await useCase.run({ input: req.body, params: req.params });
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  public static async list(
    req: express.Request,
    res: express.Response,
    next
  ): Promise<void> {
    const repo: TypeormUserInstrumentRepository = new TypeormUserInstrumentRepository();

    const useCase = new ListUserInstrument(repo);
    try {
      const result = await useCase.run();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
