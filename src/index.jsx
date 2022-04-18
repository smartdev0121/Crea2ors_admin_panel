import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";

import "./index.css";
import "antd/dist/antd.css";
import "react-multi-carousel/lib/styles.css";
import buildStore from "./store";
import { getToken } from "./utils/storage";
import { getProfile } from "./store/profile/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const history = createBrowserHistory({});
const store = buildStore(history, {});

if (getToken()) {
  store.dispatch(getProfile());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
