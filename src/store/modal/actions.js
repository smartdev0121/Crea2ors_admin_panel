export const types = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
};

export const showModal = () => {
  return {
    type: types.SHOW_MODAL,
    modalType: "CONFIRM_EMAIL",
    modalProps: {
      postId: 42,
    },
  };
};

export const hideModal = () => {
  return {
    type: types.HIDE_MODAL,
    payload: {},
  };
};
