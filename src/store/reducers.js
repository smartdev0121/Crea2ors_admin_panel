import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import profile from "./profile/reducer";
import app from "./app/reducer";
import modal from "./modal/reducer";
import users from "./users/reducer";
import wallet from "./wallet/reducer";
import contract from "./contract/reducer";
import orders from "./order/reducer";
import data from "./data/reducer";

const rootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    form,
    data,
    profile,
    orders,
    app,
    modal,
    users,
    wallet,
    contract,
  });
};

export default rootReducer;
