import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "messages",
  initialState: {
    message: [],
    messageType: [],
    isMessage: false,
  },
  reducers: {
    messageRecived: (state, action) => {
      state.isMessage = true;
      state.messageType = action.payload.messageType;
      state.message = action.payload.message;
    },
    messageClear: (state) => {
      state.isMessage = false;
      state.message = [];
      state.messageType = [];
    },
  },
});

export const { messageRecived, messageClear } = slice.actions;
export default slice.reducer;
