import { getRepository, Repository } from "typeorm";
import { UserInstrument } from "../../domain/user-instrument/UserInstrument";
import { UserInstrumentRepository } from "../../domain/user-instrument/UserInstrumentRepository";
import { TypeormUserInstrumentEntity } from "./entities/TypeormUserInstrumentEntity";

export class TypeormUserInstrumentRepository
  implements UserInstrumentRepository {
  private repo: Repository<TypeormUserInstrumentEntity>;
  constructor() {
    this.repo = getRepository(TypeormUserInstrumentEntity);
  }
  public async getUserInstrumentById(id: number): Promise<UserInstrument> {
    const userInstrument = await this.repo.findOne(id);

    if (!userInstrument) {
      return null;
    }

    return UserInstrument.createFromSource(userInstrument);
  }
  public async addUserInstrument(
    userInstrument: UserInstrument
  ): Promise<UserInstrument> {
    const created = await this.repo.insert(userInstrument.toDto());

    return UserInstrument.createFromSource({
      ...userInstrument,
      ...created.generatedMaps[0],
    });
  }
  public async deleteUserInstrument(
    userInstrument: UserInstrument
  ): Promise<void> {
    await this.repo.delete(userInstrument.instrumentId);
  }
  public async GetUserInstruments(): Promise<UserInstrument[]> {
    const list = await this.repo.find();

    return list.map((entity) => UserInstrument.createFromSource(entity));
  }
}
