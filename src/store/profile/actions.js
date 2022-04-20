import * as api from "../../utils/magicApi";
import { getToken } from "../../utils/storage";
import * as appActions from "../app/actions";
import Pusher from "pusher-js";

export const types = {
  PROFILE_INFO: "PROFILE_INFO",
  PROFILE_INFO_UPDATE: "PROFILE_INFO_UPDATE",
  PROFILE_MESSAGE_COUNT: "PROFILE_MESSAGE_COUNT",
};

export const getProfile = () => (dispatch) => {
  dispatch(appActions.showSpinner("PROFILE_INFO"));

  return api
    .get("/profile/info")
    .then((res) => {
      // const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      //   auth: {
      //     headers: {
      //       "X-CSRF-TOKEN": getToken(),
      //     },
      //   },
      //   authEndpoint: "/pusher/auth",
      //   cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      // });

      dispatch({
        type: types.PROFILE_INFO,
        payload: { ...res },
      });

      return res.nickName;
    })
    .finally(() => {
      dispatch(appActions.hideSpinner("PROFILE_INFO"));
    });
};
