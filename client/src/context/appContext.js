import { useContext, createContext, useReducer } from "react";
import { reducer } from "./reducers";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";
const initailState = {
  isLoading: false,
  isAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, initailState);
  const changeAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };
  return (
    <AppContext.Provider value={{ ...values, changeAlert }}>
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
