import { UserInstrument } from "../../domain/user-instrument/UserInstrument";
import { UserInstrumentRepository } from "../../domain/user-instrument/UserInstrumentRepository";
import { UseCase } from "../UseCase";

export class AddUserInstrument implements UseCase {
  private userInstrumentRepository: UserInstrumentRepository;

  constructor(userInstrumentRepository: UserInstrumentRepository) {
    this.userInstrumentRepository = userInstrumentRepository;
  }

  public async run(context: {
    input: { [key: string]: string };
    params: { [key: string]: string };
  }): Promise<void> {
    // TODO check for duplicates
    await this.userInstrumentRepository.addUserInstrument(
      UserInstrument.create(context.input)
    );
  }
}
