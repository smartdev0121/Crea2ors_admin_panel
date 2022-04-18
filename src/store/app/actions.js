export const types = {
  SHOW_SPINNER: "SHOW_SPINNER",
  HIDE_SPINNER: "HIDE_SPINNER",
};

export const showSpinner = (id = "app") => ({
  type: types.SHOW_SPINNER,
  payload: id,
});

export const hideSpinner = (id = "app") => ({
  type: types.HIDE_SPINNER,
  payload: id,
});
