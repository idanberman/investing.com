import { Entity, PrimaryColumn } from "typeorm";

@Entity("selected_instrument")
export class TypeormSelectedUserInstrumentEntity {
  @PrimaryColumn()
  public instrumentId: number;
}
