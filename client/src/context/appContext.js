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
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "./actions";

const user = localStorage.getItem("user");

const userLocation = localStorage.getItem("location");

const token = localStorage.getItem("token");

export const initialState = {
  isLoading: false,
  isAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSideBar: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, initialState);

  //Axios Default
  axios.defaults.headers.common["Authorization"] = `Bearer ${values.token}`;

  const authFetch = axios.create({
    baseURL: "api/v1",
    // headers:{ Authorization: `Bearer ${values.token}`}
  });

  // Add a request interceptor
  authFetch.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // config.headers.common["Authorization"] = `Bearer ${values.token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  authFetch.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        logOut();
      }
      return Promise.reject(error);
    }
  );

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

  const toggleSideBarFunc = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logOut = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (userInfo) => {
    try {
      dispatch({ type: UPDATE_USER_BEGIN });
      const { data } = await authFetch.patch("/auth/updateUser", {
        ...userInfo,
      });
      const { user, location, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ token, user, location });
    } catch (error) {
      if (error.response.data.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
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
        toggleSideBarFunc,
        logOut,
        updateUser,
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
