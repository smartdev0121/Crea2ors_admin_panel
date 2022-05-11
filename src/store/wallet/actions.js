import * as api from "src/utils/magicApi";

export const types = {
  CONNECTED_WALLET: "CONNECTED_WALLET",
  REJECT_WALLET: "REJECT_WALLET",
};

export const connectedWallet = (walletAddress) => async (dispatch) => {
  console.log("wallet__Address", walletAddress);
  return api
    .post("/wallet-connected", { walletAddress: walletAddress })
    .then((res) => {
      dispatch({
        type: types.CONNECTED_WALLET,
        payload: "",
      });
    })
    .catch((err) => console.log(err));
};

export const rejectConnectWallet = () => {
  return {
    type: types.REJECT_WALLET,
    payload: "",
  };
};
