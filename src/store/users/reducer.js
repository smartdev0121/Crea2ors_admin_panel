import { types } from "./actions";

const initialState = { userInfo: {}, status: true, otherUserInfo: {} };

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USER_INFO:
      console.log(payload);
      return { ...appState, userInfo: { ...payload }, status: true };
    case types.SET_USER_INFO:
      return { ...appState, userInfo: { ...payload }, status: true };
    case types.GET_AVATAR_URL:
      return { ...appState, userInfo: { ...payload }, status: true };
    case types.NOT_PROFILE_FOUND:
      return { ...appState, status: false };
    case types.PROFILE_FOUND:
      console.log("hhah");
      return { ...appState, status: true, otherUserInfo: { ...payload } };
    default:
      return appState;
  }
};
