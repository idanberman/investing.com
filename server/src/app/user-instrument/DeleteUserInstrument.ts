import { UseCase } from "../UseCase";
import { UserInstrumentRepository } from "../../domain/user-instrument/UserInstrumentRepository";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { InvalidInputError } from "../../domain/errors/InvalidInputError";

export class DeleteUserInstrument implements UseCase {
  private userInstrumentRepository: UserInstrumentRepository;

  constructor(userInstrumentRepository: UserInstrumentRepository) {
    this.userInstrumentRepository = userInstrumentRepository;
  }

  public async run(context: {
    input: { [key: string]: string };
    params: { [key: string]: string };
  }): Promise<void> {
    const instrumentToDeleteId = Number.parseInt(
      context.params.instrumentId,
      10
    );

    if (Number.isNaN(instrumentToDeleteId)) {
      throw new InvalidInputError(["Invalid id"]);
    }

    const instrumentToDelete = await this.userInstrumentRepository.getUserInstrumentById(
      instrumentToDeleteId
    );

    if (!instrumentToDelete) {
      throw new NotFoundError();
    }

    await this.userInstrumentRepository.deleteUserInstrument(
      instrumentToDelete
    );
  }
}
