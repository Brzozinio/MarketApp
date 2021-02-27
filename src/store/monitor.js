import { createSlice } from "@reduxjs/toolkit";
import { requestStarted } from "./admin";
import { apiCallBegan } from "./api";
import { messageRecived } from "./message";
import _ from "lodash";
import Moment from "moment";

const slice = createSlice({
  name: "monitor",
  initialState: {
    monitors: [],
    newMonitor: {
      monitorName: "",
      monitorType: "1",
      monitorKeyWords: "",
      monitorUsername: "",
      monitorAllegro: false,
      monitorEBay: false,
      kategoriaAllegro: 0,
      kategoriaEBay: 0,
      monitorMoneyChecked: false,
      monitorKwotaMin: 0,
      monitorKwotaMax: 0,
      monitorTimeHours: 0,
      monitorTimeMinutes: 0,
      monitorNotifications: ["email"],
    },
    history: [],
    historyLoaded: false,
    monitorsLoaded: false,
    monitorAdded: false,
  },
  reducers: {
    requestMonitors: (state, action) => {
      state.monitorsLoaded = false;
    },
    requestHistory: (state) => {
      state.historyLoaded = false;
    },
    historyRecived: (state, action) => {
      state.historyLoaded = true;
      state.history = action.payload;

      const sortedArray = _.orderBy(
        state.history.history,
        (o) => {
          return Moment(o.createTime);
        },
        ["desc"]
      );
      state.history.history = sortedArray;
    },
    monitorsRecived: (state, action) => {
      state.monitors = action.payload.monitors;
      state.monitorsLoaded = true;
    },
    monitorRecived: (state, action) => {
      state.newMonitor = action.payload;
    },
    monitorAddStart: (state) => {
      state.monitorAdded = false;
    },
    monitorAddedStatus: (state) => {
      state.monitorAdded = true;
    },
    changeFormData: (state, data) => {
      const name = data.payload[0].name;
      const value = data.payload[0].value;
      state.newMonitor = { ...state.newMonitor, [name]: value };
    },
    changeFormTime: (state, data) => {
      state.newMonitor = {
        ...state.newMonitor,
        monitorTimeHours: data.payload.h,
        monitorTimeMinutes: data.payload.m,
      };
    },
    resetNewMonitor: (state) => {
      state.newMonitor = {
        monitorName: "",
        monitorType: "1",
        monitorKeyWords: "",
        monitorUsername: "",
        monitorAllegro: false,
        monitorEBay: false,
        kategoriaAllegro: ["0"],
        kategoriaEBay: ["0"],
        monitorMoneyChecked: false,
        monitorKwotaMin: 0,
        monitorKwotaMax: 0,
        monitorTimeHours: 0,
        monitorTimeMinutes: 0,
        monitorNotifications: ["email"],
      };
    },
    changeFormTab: (state, value) => {
      console.log(value);

      state.newMonitor = {
        ...state.newMonitor,
        monitorType: value.payload,
      };
    },
    changeMonitorMoney: (state) => {
      state.newMonitor.monitorMoneyChecked = !state.newMonitor
        .monitorMoneyChecked;
    },
  },
});

export const {
  requestMonitors,
  monitorsRecived,
  monitorAddedStatus,
  monitorAddStart,
  changeFormData,
  changeFormTime,
  changeFormTab,
  monitorRecived,
  changeMonitorMoney,
  resetNewMonitor,
  requestHistory,
  historyRecived,
} = slice.actions;
export default slice.reducer;

export const addUserMonitor = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/monitor",
      method: "POST",
      data: data,
      token: token,
      onStart: monitorAddStart.type,
      onSuccess: monitorAddedStatus.type,
      onSuccessMessage: messageRecived.type,
    })
  );
};

export const getUserMonitors = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/monitor",
      method: "GET",
      token: token,
      onSuccess: monitorsRecived.type,
    })
  );
};

export const getUsermonitor = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/monitor?monitor=" + data,
      method: "GET",
      token: token,
      onSuccess: monitorRecived.type,
    })
  );
};

export const changeUserMonitorStatus = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/monitor/status",
      method: "POST",
      data: data,
      token: token,
      onStart: requestMonitors.type,
      onSuccess: monitorsRecived.type,
      onSuccessAdmin: requestStarted.type,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const deleteUserMonitor = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/monitor",
      method: "DELETE",
      data: data,
      token: token,
      onStart: requestMonitors.type,
      onSuccess: monitorsRecived.type,
      onSuccessAdmin: requestStarted.type,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const editUserMonitor = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/monitor/edit",
      method: "POST",
      data: data,
      token: token,
      onStart: monitorAddStart.type,
      onSuccess: monitorAddedStatus.type,
      onSuccessMessage: messageRecived.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const getMonitorHistory = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/monitor/history",
      method: "GET",
      token: token,
      onStart: requestHistory.type,
      onSuccess: historyRecived.type,
    })
  );
};
