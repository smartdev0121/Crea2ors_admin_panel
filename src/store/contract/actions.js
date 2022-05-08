import * as api from "../../utils/magicApi";
import { showNotify } from "../../utils/notify";

export const types = {
  CONTRACT_DEPLOYED: "CONTRACT_DEPLOYED",
  NFT_FETCHED: "NFT_FETCHED",
  COLLECTIONS_FETCHED: "COLLECTIONS_FETCHED",
};

export const saveCollection =
  (contractUri, contractAddress, metaData, imageUri, history) => (dispatch) => {
    return api
      .post("/contract-deployed", {
        contractUri: contractUri,
        contractAddress: contractAddress,
        metaData,
        imageUri,
      })
      .then((res) => {
        if (res.result) {
          showNotify("Contract information is successfully stored!");
          console.log("History", history);
          history.push(`/collection-view/${contractAddress}`);
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
      console.log(res);
      dispatch({
        type: types.CONTRACT_DEPLOYED,
        payload: {
          contractUri: res.contractUri,
          contractAddress,
          id: res.id,
          nfts: res.nfts,
        },
      });
    })
    .catch((err) => {
      if (!err.result) showNotify("Connection problem is occured!", "error");
    });
};

export const saveNFT =
  (contractId, metaData, metaDataUri, fileUri, history) => (dispatch) => {
    return api
      .post("/create-nft", { contractId, metaData, metaDataUri, fileUri })
      .then((res) => {
        if (res.name) {
          showNotify(`${res.name} is stored successfully!`);
        }
      })
      .catch((err) => {
        showNotify(
          `Can't store your nft information, confirm network connection!`,
          "error"
        );
        console.log(err);
      });
  };

export const getNFTInformation = (nftId) => (dispatch) => {
  return api
    .get(`/get-nft/${nftId}`)
    .then((res) => {
      dispatch({ type: types.NFT_FETCHED, payload: res });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserCollections = () => (dispatch) => {
  return api
    .get("/get-user-collections")
    .then((res) => {
      dispatch({
        type: types.COLLECTIONS_FETCHED,
        payload: [...res.collections],
      });
    })
    .catch((err) => {});
};
