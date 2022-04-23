import { types } from "./actions";

const initialState = {
  modalType: null,
  modalProps: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      console.log("here is reducer");
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case "HIDE_MODAL":
      return initialState;
    default:
      return state;
  }
};
