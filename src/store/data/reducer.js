import { types } from "./actions";

const initialState = { categories: [] };

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.CATEGORIES_FETCHED:
      return { ...appState, categories: [...payload] };
    case types.COLLECTIONS_FETCHED:
      return { ...appState, collections: [...payload] };
    case types.HOMEPAGE_DATA_FETCHED:
      return { ...appState, homepageDatas: [...payload] };
    case types.USER_DATA_FETCHED:
      return { ...appState, users: [...payload] };
    case types.REPORT_DATA_FETCHED:
      return { ...appState, reports: [...payload] };
    default:
      return appState;
  }
};
