export const types = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
};

export const showModal = () => {
  console.log("showmodal dispatched");

  return {
    type: types.SHOW_MODAL,
    modalType: "CONFIRM_EMAIL",
    modalProps: {
      postId: 42,
    },
  };
};

export const hideModal = () => {
  console.log("hide action is dispatched");

  return {
    type: types.HIDE_MODAL,
    payload: {},
  };
};
