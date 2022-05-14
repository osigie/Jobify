import { unAuthenticatedError } from "../Errors/unAuthenticated.js";

export const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new unAuthenticatedError("Not authorized to access this route");
};
