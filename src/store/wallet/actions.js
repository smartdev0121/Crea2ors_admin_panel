export const types = {
  CONNECTED_WALLET: "CONNECTED_WALLET",
  REJECT_WALLET: "REJECT_WALLET",
};

export const connectedWallet = () => {
  return {
    type: types.CONNECTED_WALLET,
    payload: "",
  };
};

export const rejectConnectWallet = () => {
  return {
    type: types.REJECT_WALLET,
    payload: "",
  };
};
