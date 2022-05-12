import * as api from "./magicApi";

export const getSearchAsset = async (keyword) => {
  return api
    .post("/search", { keyword })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
};
