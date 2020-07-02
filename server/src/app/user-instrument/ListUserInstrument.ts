import { UserInstrumentDto } from "../../domain/user-instrument/UserInstrumentDto";
import { UserInstrumentRepository } from "../../domain/user-instrument/UserInstrumentRepository";
import { UseCase } from "../UseCase";

export class ListUserInstrument implements UseCase {
  private userInstrumentRepository: UserInstrumentRepository;

  constructor(userInstrumentRepository: UserInstrumentRepository) {
    this.userInstrumentRepository = userInstrumentRepository;
  }

  public async run(): Promise<UserInstrumentDto[]> {
    return (
      await this.userInstrumentRepository.GetUserInstruments()
    ).map((userInstrument) => userInstrument.toDto());
  }
}
