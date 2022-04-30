import { types } from "./actions";

const initialState = { userInfo: { email: "", nickName: "" } };

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_USER_INFO:
      return { userInfo: { ...payload } };
    default:
      return appState;
  }
};
