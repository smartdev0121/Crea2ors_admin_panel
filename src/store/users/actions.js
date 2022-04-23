import * as api from "../../utils/magicApi";
import { showSpinner, hideSpinner } from "../app/actions";
import { showNotify } from "../../utils/notify";
import { showModal } from "../modal/actions";

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
        showNotify("User has been created successfully!");
        history.push("/sign-in");
        dispatch(showModal());
      })
      .catch((res) => {
        console.log(res);
        showNotify(
          res.email
            ? "Sorry! email already exists"
            : "Sorry! Connection problem happened!",
          "error"
        );
      });
};

export const emailVerified = (email, history) => (dispatch) => {
  console.log("email add", { email: email });
  return api
    .post("/email-verified", { email })
    .then((res) => {
      if (res.result === true) {
        showNotify(`${email} is successfully verified!`);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
      showNotify("Connection problem!", "error");
    });
};
