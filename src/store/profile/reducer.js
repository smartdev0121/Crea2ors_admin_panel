import { types } from "./actions";
const initialState = null;

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.PROFILE_INFO:
      return payload;
    default:
      return appState;
  }
};

export const getProfile = (state) => state.profile;
