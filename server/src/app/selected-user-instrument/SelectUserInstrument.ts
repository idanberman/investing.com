import { InvalidInputError } from "../../domain/errors/InvalidInputError";
import { SelectedUserInstrumentRepository } from "../../domain/user-instrument/SelectedUserInstruemntRepository";
import { UserInstrumentRepository } from "../../domain/user-instrument/UserInstrumentRepository";
import { UseCase } from "../UseCase";

export class SelectUserInstrument implements UseCase {
  private selectedUserInstrumentRepository: SelectedUserInstrumentRepository;
  private userInstrumentRepository: UserInstrumentRepository;

  constructor(
    selectedUserInstrumentRepository: SelectedUserInstrumentRepository,
    userInstrumentRepository: UserInstrumentRepository
  ) {
    this.selectedUserInstrumentRepository = selectedUserInstrumentRepository;
    this.userInstrumentRepository = userInstrumentRepository;
  }

  public async run(context: {
    input: { [key: string]: string };
    params: { [key: string]: string };
  }): Promise<void> {
    const validInstrumentId = Number.parseInt(context.params.instrumentId, 10);

    if (!Number.isInteger(validInstrumentId)) {
      throw new InvalidInputError([
        "the supplied instrumentId in the url is missing or wrong, please supply an id number",
      ]);
    }

    if (
      await this.selectedUserInstrumentRepository.isUserInstrumentSelected(
        validInstrumentId
      )
    ) {
      throw new InvalidInputError([
        "the supplied instrumentId already selected",
      ]);
    }

    const userInstrument = await this.userInstrumentRepository.getUserInstrumentById(
      validInstrumentId
    );

    if (!userInstrument) {
      throw new InvalidInputError([
        "the supplied instrumentId does not exist in the system",
      ]);
    }

    await this.selectedUserInstrumentRepository.selectUserInstrument(
      validInstrumentId
    );
  }
}
