import { DomainError } from "./DomainError";
import { ErrorType } from "./ErrorType";

export class InvalidInputError extends Error implements DomainError {
  public errorType: ErrorType;
  constructor(errorList: string[]) {
    super(
      "The input is invalid. Please correct the following input:" +
        errorList.join(", ")
    );
    this.errorType = ErrorType.InvalidInput;
  }
}
