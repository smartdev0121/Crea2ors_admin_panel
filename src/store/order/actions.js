import * as api from "../../utils/magicApi";
import { showNotify } from "../../utils/notify";

export const types = {
  ORDER_CREATED: "ORDER_CREATED",
  ORDERS_FETCHED: "ORDERS_FETCHED",
};

export const orderCreated = (orderData) => (dispatch) => {
  console.log(orderData);
  return api
    .post("/order-created", { orderData: { ...orderData } })
    .then((res) => {
      if (res.newOrder) {
        dispatch({type: types.ORDER_CREATED, payload: {...res.newOrder}});
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchOrderData = () => (dispatch) => {
  return api.get("/get-orders").then((res) => {
    dispatch({type: types.ORDERS_FETCHED, payload: [...res.ordersData]})
  }).catch(err => {
    console.log(err);
  })
}