import * as api from "../../utils/magicApi";
import {showNotify} from  "../../utils/notify";

export const types = {
  CONTRACT_DEPLOYED: "CONTRACT_DEPLOYED",
};

export const saveCollection = (contractUri, contractAddress) => (dispatch) => {
  console.log(contractUri);
  return api
    .post("/contract-deployed", {contractUri: contractUri, contractAddress: contractAddress})
    .then((res) => {
      console.log(res);
      if (res.result) {
        showNotify("Contract information is successfully stored!");
        console.log("I am going to dispatch");
        dispatch({type: types.CONTRACT_DEPLOYED, payload: { contractUri,  contractAddress}});
      }
    })
    .catch((err) => {if(!err.result) showNotify("Connection problem is occured!", "error")});
};
