import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import jwt_decode from "jwt-decode";
import { messageRecived } from "./message";
import _ from "lodash";
const Moment = require("moment");

const slice = createSlice({
  name: "users",
  initialState: {
    user: [],
    loading: false,
    lastFetch: null,
    dashboard: [
      {
        messages: 0,
        monitors: 0,
        offers: 0,
        history: [],
      },
    ],
    dashboardLoaded: false,
    logged: false,
  },
  reducers: {
    userRequested: (user) => {
      user.loading = true;
    },
    userRequestFailed: (user) => {
      user.loading = false;
      user.logged = false;
    },
    tokenRecived: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("token", token);
      const user = jwt_decode(token);
      state.user = user;
      state.loading = false;
      state.logged = true;
    },
    setDashboardData: (state, action) => {
      state.dashboardLoaded = true;
      const { message, monitors, offers, history } = action.payload;
      state.dashboard[0].messages = message;
      state.dashboard[0].monitors = monitors;
      state.dashboard[0].offers = offers;
      const sortedArray = _.orderBy(
        history,
        (o) => {
          return Moment(o.createTime);
        },
        ["desc"]
      );
      const historyArr = [];
      for (var i = 0; i < sortedArray.length; i++) {
        if (i <= 9) {
          historyArr.push(sortedArray[i]);
        }
      }
      state.dashboard[0].history = historyArr;
    },
    setDashboardLoad: (state) => {
      state.dashboardLoaded = false;
    },
  },
});

const {
  userRequestFailed,
  userRequested,
  tokenRecived,
  setDashboardData,
  setDashboardLoad,
} = slice.actions;
export default slice.reducer;

export const userDataChange = (userData, token) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/users/changedata",
      method: "POST",
      data: userData,
      token: token,
      onSuccess: tokenRecived.type,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const userDelete = (token) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/users",
      method: "DELETE",
      token: token,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const loginUser = (userData) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/auth",
      method: "POST",
      data: userData,
      onStart: userRequested.type,
      onSuccess: tokenRecived.type,
      onError: userRequestFailed.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const registerUser = (userData) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/users/register",
      method: "POST",
      data: userData,
      onSuccess: tokenRecived.type,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const verifyRestoreCode = (code) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/auth/code",
      method: "POST",
      data: code,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const resetPassword = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/users/resetpassword",
      method: "POST",
      data: data,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const loginWithToken = (token) => (dispatch) => {
  return dispatch(tokenRecived({ token: token }));
};

export const restoreUserAccount = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/users/restore",
      method: "POST",
      data: data,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const loadUserDashboard = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/users/dashboard",
      method: "GET",
      token: token,
      onStart: setDashboardLoad.type,
      onSuccess: setDashboardData.type,
    })
  );
};
