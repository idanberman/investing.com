import { UserInstrumentDto } from "./UserInstrumentDto";
import { InvalidInputError } from "../errors/InvalidInputError";

export interface UserInstrumentProps {
  instrumentId: number;
  name: string;
  symbol: string;
  instrumentType: string;
}

export class UserInstrument {
  get instrumentId() {
    return this._instrumentId;
  }

  get name() {
    return this._name;
  }

  get symbol() {
    return this._symbol;
  }

  get instrumentType() {
    return this._instrumentType;
  }

  set instrumentId(value) {
    this._instrumentId = value;
  }

  set name(value) {
    this._name = value;
  }

  set symbol(value) {
    this._symbol = value;
  }

  set instrumentType(value) {
    this._instrumentType = value;
  }

  public static create(userInstrumentProps: any) {
    if (!userInstrumentProps) {
      throw new Error("name, symbol and instrumentType are required");
    }
    const { instrumentId, name, symbol, instrumentType } = userInstrumentProps;

    const errorList = [];

    if (instrumentId) {
      errorList.push(
        "instrumentId should not attached when creating user instrument"
      );
    }

    if (!name || name.length === 0 || name.length > 50) {
      errorList.push(
        "'name' is required and must not contain more than 50 characters"
      );
    }

    if (!symbol || symbol.length === 0 || symbol.length > 20) {
      errorList.push(
        "'symbol' is required and must not contain more than 20 characters"
      );
    }

    if (
      !instrumentType ||
      instrumentType.length === 0 ||
      instrumentType.length > 10
    ) {
      errorList.push(
        "'instrumentType' is required and must not contain more than 10 characters"
      );
    }

    if (errorList.length > 0) {
      throw new InvalidInputError(errorList);
    }

    return new UserInstrument(userInstrumentProps);
  }

  public toDto(): UserInstrumentDto {
    return {
      instrumentId: this._instrumentId,
      name: this._name,
      symbol: this._symbol,
      instrumentType: this.instrumentType,
    };
  }

  public static createFromSource(rawData: object): UserInstrument {
    const userInstrument: UserInstrument = new UserInstrument();
    Object.assign(userInstrument, rawData);
    return userInstrument;
  }

  private _instrumentId: number;
  private _name: string;
  private _symbol: string;
  private _instrumentType: string;

  private constructor(props?: UserInstrumentProps) {
    if (props) {
      const { instrumentId, name, symbol, instrumentType } = props;
      this._instrumentId = instrumentId;
      this._name = name;
      this._symbol = symbol;
      this._instrumentType = instrumentType;
    }
  }
}
