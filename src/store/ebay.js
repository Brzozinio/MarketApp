import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { messageRecived } from "./message";

const slice = createSlice({
  name: "ebay",
  initialState: {
    isEbayRegistered: false,
    user: null,
    loaded: false,
    ebayBlock: false,
  },
  reducers: {
    ebayLogged: (state, action) => {
      state.isAllegroRegistered = true;
      state.user = action.payload.user;
    },
    ebayLogout: (state) => {
      state.isAllegroRegistered = false;
    },
    ebayUserRecive: (state, action) => {
      state.user = action.payload;
      state.isAllegroRegistered = true;
      state.loaded = true;
    },
    ebayUserReciveFail: (state, action) => {
      state.user = null;
      state.loaded = true;
    },
    ebayStart: (state) => {
      state.loaded = false;
      state.ebayBlock = false;
    },
    ebayBlocade: (state) => {
      state.ebayBlock = true;
    },
    ebayUnblock: (state) => {
      state.ebayBlock = false;
    },
  },
});

export const {
  ebayLogged,
  ebayLogout,
  ebayUserRecive,
  ebayUserReciveFail,
  ebayStart,
  ebayBlocade,
  ebayUnblock,
} = slice.actions;
export default slice.reducer;

export const registerEbayAccount = (token, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/ebay/token",
      method: "POST",
      data: data,
      token: token,
      onSuccess: ebayLogged.type,
      onSuccessMessage: messageRecived.type,
    })
  );
};

export const deleteEbayToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/ebay/token",
      method: "DELETE",
      token: token,
      onSuccessMessage: messageRecived.type,
      onSuccess: ebayLogout.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const loadEbayUserData = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/ebay/me",
      method: "GET",
      token: token,
      onStart: ebayStart.type,
      onSuccess: ebayUserRecive.type,
      onError: ebayUserReciveFail.type,
    })
  );
};
