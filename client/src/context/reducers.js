import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

export const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      isAlert: true,
      alertText: "please add all fields!",
      alertType: "danger",
    };
  } else if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      isAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  throw new Error(`no such action:${action.type}`);
};
