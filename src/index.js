import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configuteStore from "./store/configuteStore";
import { BrowserRouter } from "react-router-dom";
import "../src/components/common/styles.css";

const store = configuteStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
