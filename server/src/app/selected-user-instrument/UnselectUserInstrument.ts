import { InvalidInputError } from "../../domain/errors/InvalidInputError";
import { SelectedUserInstrumentRepository } from "../../domain/user-instrument/SelectedUserInstruemntRepository";
import { UseCase } from "../UseCase";

export class UnselectUserInstrument implements UseCase {
  private selectedUserInstrumentRepository: SelectedUserInstrumentRepository;

  constructor(
    selectedUserInstrumentRepository: SelectedUserInstrumentRepository
  ) {
    this.selectedUserInstrumentRepository = selectedUserInstrumentRepository;
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
      !(await this.selectedUserInstrumentRepository.isUserInstrumentSelected(
        validInstrumentId
      ))
    ) {
      throw new InvalidInputError([
        "the supplied instrumentId is not selected",
      ]);
    }

    await this.selectedUserInstrumentRepository.unselectUserInstrument(
      validInstrumentId
    );
  }
}
