import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./CustomApi.js";

export class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
