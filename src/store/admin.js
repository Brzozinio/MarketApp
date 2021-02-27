import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { messageRecived } from "./message";

const slice = createSlice({
  name: "admin",
  initialState: {
    list: [],
    loaded: false,
  },
  reducers: {
    listRecived: (state, action) => {
      state.list = action.payload;
      state.loaded = true;
    },
    requestStarted: (state) => {
      state.loaded = false;
    },
  },
});

export const { requestStarted, listRecived } = slice.actions;
export default slice.reducer;

export const loadUsers = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/users/userlist",
      method: "GET",
      token: token,
      onStart: requestStarted.type,
      onSuccess: listRecived.type,
    })
  );
};

export const deleteUserAdmin = (id) => (dispatch) => {
  const token = localStorage.getItem("token");
  return dispatch(
    apiCallBegan({
      url: "/users/user",
      method: "DELETE",
      data: id,
      token: token,
      onSuccess: requestStarted.type,
      onSuccessMessage: messageRecived.type,
    })
  );
};
