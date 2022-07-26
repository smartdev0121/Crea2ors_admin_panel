import * as api from "../../utils/magicApi";
import * as appActions from "../app/actions";
import { showNotify } from "../../utils/notify";
import { async } from "rxjs";
export const types = {
  COLLECTIONS_FETCHED: "COLLECTIONS_FETCHED",
  CATEGORIES_FETCHED: "CATEGORIES_FETCHED",
  HOMEPAGE_DATA_FETCHED: "HOMEPAGE_DATA_FETCHED",
  USER_DATA_FETCHED: "USER_DATA_FETCHED",
  REPORT_DATA_FETCHED: "REPORT_DATA_FETCHED",
};

export const blockUser = (id, type) => async (dispatch) => {
  return api
    .post("/block_user", { id, type })
    .then((res) => {
      dispatch({ type: types.USER_DATA_FETCHED, payload: res.users });
    })
    .catch((err) => {
      console.log(err);
      showNotify("Server connection error");
    });
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

export const fetchReportData = () => async (dispatch) => {
  return api
    .get("/fetch_reports")
    .then((res) => {
      dispatch({ type: types.REPORT_DATA_FETCHED, payload: res.reports });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

export const markRead = () => async (dispatch) => {
  return api
    .post("/mark_report_read")
    .then((res) => {})
    .catch((err) => {
      console.log(err);
      return;
    });
};

export const onReportDelete = (id) => async (dispatch) => {
  return api
    .post("/delete_report", { id })
    .then((res) => {
      dispatch({ type: types.REPORT_DATA_FETCHED, payload: res.reports });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};
