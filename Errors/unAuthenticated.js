


import { StatusCodes } from "http-status-codes";

import { CustomApiError } from "./CustomApi.js";



export class unAuthenticatedError extends CustomApiError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }