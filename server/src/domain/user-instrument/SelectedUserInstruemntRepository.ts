import { UserInstrument } from "./UserInstrument";

export interface SelectedUserInstrumentRepository {
  selectUserInstrument(id: number);
  unselectUserInstrument(id: number);
  getSelectedUserInstrument();
  isUserInstrumentSelected(id: number): Promise<boolean>;
}
