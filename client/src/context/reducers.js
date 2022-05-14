import { initialState } from "./AppContext";

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
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

export const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      isAlert: true,
      alertText: "please add all fields!",
      alertType: "danger",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      isAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isAlert: true,
      isLoading: false,
      alertText: "User Created!  Loading....",
      alertType: "success",
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isAlert: true,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === SETUP_LOGIN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_LOGIN_SUCCESS) {
    return {
      ...state,
      isAlert: true,
      isLoading: false,
      alertText: "Login successful! Loading.....",
      alertType: "success",
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }
  if (action.type === SETUP_LOGIN_ERROR) {
    return {
      ...state,
      isAlert: true,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSideBar: !state.showSideBar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      location: action.payload.location,
      token: action.payload.token,
      alertText: "Updated successfully",
      alertType: "success",
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isAlert: true,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isAlert: true,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.target.name]: action.payload.target.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
    };
    return { ...state, ...initialState };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertText: "Created successfully",
      alertType: "success",
      isAlert: true,
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isAlert: true,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === GET_JOBS_BEGIN) {
    return {
      ...state,
      isAlert: false,
      isLoading: true,
    };
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,

      isLoading: false,
      numOfPages: action.payload.numOfPages,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const { company, _id, position, jobLocation, jobType, status } =
      state.jobs.find((job) => job._id === action.payload.id);
    return {
      ...state,
      isEditing: true,
      company,
      editJobId: _id,
      position,
      jobLocation,
      jobType,
      status,
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Updated!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`no such action:${action.type}`);
};
