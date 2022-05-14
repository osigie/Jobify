

import {unAuthenticatedError} from "../Errors/index.js"
export const checkPermission= async (db,resource)=>{
    const logIn = resource.user.userId;
    const { id: jobId } = resource.params;
    const data = await db.findOne({ _id: jobId });
  
    if (data.createdBy.toString() !== logIn) {
      throw new unAuthenticatedError("Not Authorized");
    }
}
 