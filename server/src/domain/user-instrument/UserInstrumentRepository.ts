import { UserInstrument } from "./UserInstrument";

export interface UserInstrumentRepository {
  addUserInstrument(userInstrument: UserInstrument): Promise<UserInstrument>;
  deleteUserInstrument(userInstrument: UserInstrument): Promise<void>;
  GetUserInstruments(): Promise<UserInstrument[]>;
  getUserInstrumentById(id: number): Promise<UserInstrument>;
}
