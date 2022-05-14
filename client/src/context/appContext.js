import { useContext, createContext, useReducer, useEffect } from "react";

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
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
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
  showSideBar: false,
  isEditing: false,
  jobLocation: userLocation || "",
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  page: 1,
  totalJobs: 0,
  numOfPages: 1,
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

  const handleChangeFunc = (data) => {
    dispatch({ type: HANDLE_CHANGE, payload: { ...data } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = values;
      await authFetch.post("/jobs/createJob/", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAllJobs = async () => {
    let url = `/jobs/createJob/`;

    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      console.log(error.response)();
    }
    clearAlert();
  };

  const urls = "/jobs/";

  const setEditJob = async (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    const { position, company, jobLocation, jobType, status, editJobId } =
      values;

    try {
      await authFetch.patch(urls + editJobId, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const setDeleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(urls + id);
      console.log(`set delete ${id}`);
    } catch (error) {
      console.log(error.response);
      logOut();
    }
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
        handleChangeFunc,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        setDeleteJob,
        editJob,
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
