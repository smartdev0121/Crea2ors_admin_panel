import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import profile from "./profile/reducer";
import app from "./app/reducer";
import modal from "./modal/reducer";

const rootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    form,
    profile,
    app,
    modal,
  });
};

export default rootReducer;
