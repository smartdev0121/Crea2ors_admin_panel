import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import "./index.css";
import "antd/dist/antd.css";
import "react-multi-carousel/lib/styles.css";
import buildStore from "./store";
import { getItem, getToken } from "./utils/storage";
import { getProfile } from "./store/profile/actions";
import { connectedWallet } from "./store/wallet/actions";
import { ToastContainer } from "react-toastify";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentWalletAddress } from "./utils/wallet";
const history = createBrowserHistory({});
const store = buildStore(history, {});

if (getToken()) {
  store.dispatch(getProfile());
}

console.log(typeof getItem("walletStatus"));
if (getItem("walletStatus") === true) {
  store.dispatch(connectedWallet());
}
const getLibrary = (provider, connector) => {
  const library = new Web3Provider(provider);
  library.pollingInternal = 12000;
  return library;
};
ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
      <ToastContainer />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
