import { types } from "./actions";

const initialState = { userInfo: {} };

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USER_INFO:
      console.log(payload);
      return { userInfo: { ...payload } };
    case types.SET_USER_INFO:
      return { userInfo: { ...payload } };
    case types.GET_AVATAR_URL:
      return { userInfo: { ...payload } };
    default:
      return appState;
  }
};
