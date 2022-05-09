
import { StatusCodes } from "http-status-codes";

import { CustomApiError } from "./CustomApi.js";



export class NotFoundError extends CustomApiError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.NOT_FOUND;
    }
  }