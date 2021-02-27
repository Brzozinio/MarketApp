import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { messageRecived } from "./message";

const slice = createSlice({
  name: "allegro",
  initialState: {
    isAllegroRegistered: false,
    categories: [],
    user: [],
    loaded: false,
    allegroBlock: false,
  },
  reducers: {
    allegroLogged: (state, action) => {
      state.isAllegroRegistered = true;
      state.user = action.payload.user;
    },
    allegroLogout: (state) => {
      state.isAllegroRegistered = false;
    },
    allegroCategories: (state, action) => {
      state.categories = [
        { value: "0", label: "Wszystkie Kategorie", isLeaf: true },
      ]; // eslint-disable-next-line
      action.payload.map((val, index) => {
        state.categories.push({
          value: val.id,
          label: val.name,
          isLeaf: val.leaf,
        });
      });
    },
    allegroSubCategory: (state, action) => {
      state.categories = action.payload;
    },
    allegroUserRecive: (state, action) => {
      state.user = action.payload;
      state.isAllegroRegistered = true;
      state.loaded = true;
    },
    allegroUserReciveFail: (state, action) => {
      state.user = [];
      state.loaded = true;
    },
    allegroStart: (state) => {
      state.loaded = false;
      state.allegroBlock = false;
    },
    allegroBlocade: (state) => {
      state.allegroBlock = true;
    },
    allegroUnblock: (state) => {
      state.allegroBlock = false;
    },
  },
});

export const {
  allegroLogged,
  allegroLogout,
  allegroCategories,
  allegroSubCategory,
  allegroUserRecive,
  allegroUserReciveFail,
  allegroStart,
  allegroBlocade,
  allegroUnblock,
} = slice.actions;
export default slice.reducer;

export const registerAllegroAccount = (token, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "/allegro/token",
      method: "POST",
      data: data,
      token: token,
      onSuccess: allegroLogged.type,
      onSuccessMessage: messageRecived.type,
    })
  );
};

export const getAllegroToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/allegro/token",
      method: "GET",
      token: token,
      onSuccess: allegroLogged.type,
      onError: allegroLogout.type,
    })
  );
};

export const deleteAllegroToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/allegro/token",
      method: "DELETE",
      token: token,
      onSuccessMessage: messageRecived.type,
      onSuccess: allegroLogout.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const loadAllegroCategories = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/allegro/categories",
      method: "GET",
      token: token,
      onStart: allegroStart.type,
      onSuccess: allegroCategories.type,
      onError: allegroBlocade.type,
      onErrorMessage: messageRecived.type,
    })
  );
};

export const loadAllegroSubCategory = (data) => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/allegro/subcategories",
      method: "POST",
      data: data,
      token: token,
      onSuccess: allegroSubCategory.type,
    })
  );
};

export const loadAllegroUserData = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/allegro/me",
      method: "GET",
      token: token,
      onStart: allegroStart.type,
      onSuccess: allegroUserRecive.type,
      onError: allegroUserReciveFail.type,
    })
  );
};
