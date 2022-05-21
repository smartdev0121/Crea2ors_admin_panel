import { replace } from "connected-react-router";

import * as api from "../../utils/magicApi";
import { setToken, clearInfo } from "../../utils/storage";
import * as appActions from "../app/actions";
import { getProfile } from "../../store/profile/actions";
import { showNotify } from "../../utils/notify";

export const types = {
  AUTH_LOGIN: "AUTH_LOGIN",
  AUTH_LOGUT: "AUTH_LOGUT",
};

export const login = (values) => (dispatch) => {
  dispatch(appActions.showSpinner("login"));
  return api
    .post("/auth/login", values)
    .then((res) => {
      if (res.result == "not_verified") {
        showNotify("Please wait until you are verified!", "info");
        return;
      }
      console.log(res);
      setToken(res.token);
      dispatch(getProfile());
      showNotify("You are logged successfully");
    })
    .catch((err) => {
      err.result === "wrong_info"
        ? showNotify("Username or password is wrong!", "warning")
        : showNotify("Connection Problem occured!", "error");
    })
    .finally(() => {
      dispatch(appActions.hideSpinner("login"));
    });
};

export const logout = () => {
  clearInfo();
  document.location.href = "/";
};

export const forgotPassword = (values) => (dispatch) => {
  return api.post("/auth/forgot_password", values);
};

export const resetPassword = (values) => (dispatch) => {
  return api.post("/auth/reset_password", values);
};
