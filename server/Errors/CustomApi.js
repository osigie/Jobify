
import { StatusCodes } from "http-status-codes";


export class CustomApiError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }