import * as api from "../../utils/magicApi";
import { showNotify } from "../../utils/notify";
import { setToken, clearInfo } from "../../utils/storage";
import * as appActions from "../app/actions";
import { getProfile } from "../profile/actions";
import { replace } from "connected-react-router";

export const types = {
  AUTH_LOGIN: "AUTH_LOGIN",
  AUTH_LOGOUT: "AUTH_LOGOUT",
};

export const userLogin = (values) => (dispatch) => {
  dispatch(appActions.showSpinner("login"));
  return api
    .post("/auth/login", values)
    .then((res) => {
      setToken(res.token);
      return getProfile()(dispatch);
    })
    .then(() => {
      dispatch(replace("/"));
    })
    .finally(() => {
      dispatch(appActions.hideSpinner("login"));
    });
};
