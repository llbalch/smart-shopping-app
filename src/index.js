import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  // react element to render
  <Provider store={store}>
    <App />
  </Provider>,
  // the DOM node to mount to
  document.getElementById("root")
);
