import * as api from "../../utils/magicApi";
import { showNotify } from "../../utils/notify";

export const types = {
  CONTRACT_DEPLOYED: "CONTRACT_DEPLOYED",
};

export const saveCollection = (contractUri, contractAddress) => (dispatch) => {
  return api
    .post("/contract-deployed", {
      contractUri: contractUri,
      contractAddress: contractAddress,
    })
    .then((res) => {
      if (res.result) {
        showNotify("Contract information is successfully stored!");
      }
    })
    .catch((err) => {
      if (!err.result) showNotify("Connection problem is occured!", "error");
    });
};

export const getContractUri = (contractAddress) => (dispatch) => {
  return api
    .get(`/contract/${contractAddress}`)
    .then((res) => {
      dispatch({
        type: types.CONTRACT_DEPLOYED,
        payload: { contractUri: res.contractUri, contractAddress, id: res.id },
      });
    })
    .catch((err) => {
      if (!err.result) showNotify("Connection problem is occured!", "error");
    });
};

export const saveNFT = (contractId, metaData, metaDataUri, fileUri) => (dispatch) => {
  return api.post("/create-nft", {contractId, metaData, metaDataUri, fileUri}).then(res => {
    if (res.name) {
      showNotify(`${res.name} is stored successfully!`);
    }
  }).catch(err => {
    showNotify(`Can't store your nft information, confirm network connection!`, "error");
    console.log(err);
  })
}