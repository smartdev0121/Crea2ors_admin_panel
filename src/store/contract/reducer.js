import { types } from "./actions";

const initialState = {
  collectionInfo: {},
  nftInfo: {},
  myCollections: [],
};

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.CONTRACT_DEPLOYED:
      return { ...appState, collectionInfo: { ...payload } };
    case types.NFT_FETCHED:
      return { ...appState, nftInfo: { ...payload } };
    case types.COLLECTIONS_FETCHED:
      return { ...appState, myCollections: [...payload] };
    default:
      return appState;
  }
};
