import { ErrorType } from "./ErrorType";

export interface DomainError extends Error {
  errorType: ErrorType;
}
