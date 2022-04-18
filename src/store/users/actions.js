import * as api from "../../utils/magicApi";
import { showSpinner, hideSpinner } from "../app/actions";
import { showNotify } from "../../utils/notify";

export const types = {
  CREATE_USER: "CREATE_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
};

export const createUser = (values, history) => {
  return (dispatch) =>
    api
      .post("/users", values)
      .then((res) => {
        dispatch({ type: types.CREATE_USER, payload: res });
        showNotify("Agent has been created successfully!");
        history.push("/sign-in");
      })
      .catch((res) => {
        showNotify(
          res.email
            ? "Sorry! email already exists"
            : "Sorry! Connection problem happened!",
          "error"
        );
      });
};
