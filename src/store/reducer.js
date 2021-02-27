import { combineReducers } from "redux";
import userReducer from "./user";
import messageReducer from "./message";
import allegroReducer from "./allegro";
import monitorReducer from "./monitor";
import adminReducer from "./admin";
import ebayRedicers from "./ebay";

const appReducers = combineReducers({
  users: userReducer,
  messages: messageReducer,
  allegro: allegroReducer,
  ebay: ebayRedicers,
  monitor: monitorReducer,
  admin: adminReducer,
});

const rootReducer = (state, action) => {
  if (action.type == "userLogout") {
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;
