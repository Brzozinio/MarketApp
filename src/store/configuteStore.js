import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import logger from "./middleware/logger";
// eslint-disable-next-line
export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger, api],
  });
}
