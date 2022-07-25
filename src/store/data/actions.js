import * as api from "../../utils/magicApi";
import * as appActions from "../app/actions";

export const types = {
  COLLECTIONS_FETCHED: "COLLECTIONS_FETCHED",
  CATEGORIES_FETCHED: "CATEGORIES_FETCHED",
  HOMEPAGE_DATA_FETCHED: "HOMEPAGE_DATA_FETCHED",
  USER_DATA_FETCHED: "USER_DATA_FETCHED",
};

export const fetchUserDatas = () => async (dispatch) => {
  return api
    .get("/users")
    .then((res) => {
      dispatch({ type: types.USER_DATA_FETCHED, payload: res.users });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const fetchCollectionData = (keyword) => async (dispatch) => {
  return api
    .post("/collections", { keyword })
    .then((res) => {
      dispatch({ type: types.COLLECTIONS_FETCHED, payload: res.collections });
      dispatch({
        type: types.HOMEPAGE_DATA_FETCHED,
        payload: res.homepageDatas,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchCategoryData = () => (dispatch) => {
  return api
    .get("/categories")
    .then((res) => {
      console.log(res.categories);
      dispatch({ type: types.CATEGORIES_FETCHED, payload: res.categories });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newCategoryAdded = (newName) => (dispatch) => {
  return api
    .post("/new_category", { newName })
    .then((res) => {
      dispatch(fetchCategoryData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const CategoryDelete = (id) => (dispatch) => {
  return api
    .get(`/delete_category/${id}`)
    .then((res) => {
      dispatch(fetchCategoryData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const modeChanged = (option, type, collectionId) => (dispatch) => {
  return api
    .post("/mode_change", { option, type, collectionId })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};
