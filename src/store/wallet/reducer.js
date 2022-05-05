import { types } from "./actions";

const initialState = { active: false };

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.CONNECTED_WALLET:
      return { active: true };
    case types.REJECT_WALLET:
      return { active: false };
    default:
      return appState;
  }
};
