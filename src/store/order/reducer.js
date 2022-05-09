import { types } from "./actions";

const initialState = [];

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.ORDER_CREATED:
      let newOrderArray = [...appState];
      newOrderArray.push(payload);
      return newOrderArray;
    case types.ORDERS_FETCHED:
      console.log(payload);
      return payload;
    default:
      return appState;
  }
};
