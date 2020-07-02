import { UserInstrumentDto } from "../../domain/user-instrument/UserInstrumentDto";
import { UseCase } from "../UseCase";
import { SelectedUserInstrumentRepository } from "../../domain/user-instrument/SelectedUserInstruemntRepository";

export class ListSelectedUserInstrument implements UseCase {
  private selectedUserInstrumentRepository: SelectedUserInstrumentRepository;

  constructor(
    selectedUserInstrumentRepository: SelectedUserInstrumentRepository
  ) {
    this.selectedUserInstrumentRepository = selectedUserInstrumentRepository;
  }

  public async run(): Promise<UserInstrumentDto[]> {
    return this.selectedUserInstrumentRepository.getSelectedUserInstrument();
  }
}
