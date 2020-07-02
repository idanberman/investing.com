import { DomainError } from "./DomainError";
import { ErrorType } from "./ErrorType";

export class NotFoundError extends Error implements DomainError {
  public errorType: ErrorType;
  constructor() {
    super("The requested resource can not be found");
    this.errorType = ErrorType.NotFound;
  }
}
