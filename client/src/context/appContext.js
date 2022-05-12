import { useContext, createContext, useReducer } from "react";

import { reducer } from "./reducers";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  SETUP_LOGIN_BEGIN,
  SETUP_LOGIN_SUCCESS,
  SETUP_LOGIN_ERROR,
} from "./actions";

const user = localStorage.getItem("user");

const userLocation = localStorage.getItem("location");

const token = localStorage.getItem("token");

const initailState = {
  isLoading: false,
  isAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
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

  //add user to local storage

  const addUserToLocalStorage = (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    localStorage.setItem("location", data.location);
  };

  //Remove user from local storage
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      //   console.log(response.data);
      const { token, user, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { token, user, location },
      });

      //local storage
      addUserToLocalStorage({ token, user, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: SETUP_LOGIN_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      //   console.log(response.data);
      const { token, user, location } = response.data;
      dispatch({
        type: SETUP_LOGIN_SUCCESS,
        payload: { token, user, location },
      });

      //local storage
      addUserToLocalStorage({ token, user, location });
    } catch (error) {
      dispatch({
        type: SETUP_LOGIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...values,
        changeAlert,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
