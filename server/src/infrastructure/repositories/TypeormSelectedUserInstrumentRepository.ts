import { getRepository, Repository } from "typeorm";
import { UserInstrument } from "../../domain/user-instrument/UserInstrument";
import { TypeormUserInstrumentEntity } from "./entities/TypeormUserInstrumentEntity";
import { SelectedUserInstrumentRepository } from "../../domain/user-instrument/SelectedUserInstruemntRepository";
import { TypeormSelectedUserInstrumentEntity } from "./entities/TypeormSelectedUserInstrumentEntity";

export class TypeormSelectedUserInstrumentRepository
  implements SelectedUserInstrumentRepository {
  private repo: Repository<TypeormSelectedUserInstrumentEntity>;
  constructor() {
    this.repo = getRepository(TypeormSelectedUserInstrumentEntity);
  }
  public async selectUserInstrument(id: number) {
    await this.repo.insert({
      instrumentId: id,
    });
  }
  public async unselectUserInstrument(id: number) {
    await this.repo.delete(id);
  }
  public async getSelectedUserInstrument() {
    return this.repo.find();
  }
  public async isUserInstrumentSelected(id: number): Promise<boolean> {
    const selectedInstrument = await this.repo.findOne(id);

    if (!selectedInstrument) {
      return false;
    }

    return true;
  }
}
