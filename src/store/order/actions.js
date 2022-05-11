import * as api from "../../utils/magicApi";
import { showNotify } from "../../utils/notify";

export const types = {
  ORDER_CREATED: "ORDER_CREATED",
  ORDERS_FETCHED: "ORDERS_FETCHED",
};

export const orderCreated = (orderData, nftId) => async (dispatch) => {
  try {
    const res = await api.post("/order-created", {
      orderData: { ...orderData },
      nftId: nftId,
    });
    if (res.newOrder) {
      dispatch({ type: types.ORDER_CREATED, payload: { ...res.newOrder } });
      dispatch(fetchOrderData(nftId));
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchOrderData = (nftId) => async (dispatch) => {
  return api
    .get(`/get-orders/${nftId}`)
    .then((res) => {
      console.log(res);
      dispatch({ type: types.ORDERS_FETCHED, payload: [...res.ordersData] });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const canceledOrder = (id) => (dispatch) => {
  return api
    .post("/cancel-order", { id: id })
    .then((res) => {
      if (res.result) {
        dispatch(fetchOrderData());
        showNotify("Order is successfully cancelled!");
      }
    })
    .catch((err) => {
      console.log(err);
      showNotify("Confirm internet connection!", "error");
    });
};

export const orderFinialized = (orderData, orderId, nftId) => (dispatch) => {
  return api
    .post("/order-finalized", { orderData, orderId, nftId })
    .then((res) => {
      dispatch({ type: types.ORDERS_FETCHED, payload: [...res.ordersData] });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const bidPlaced = (orderData, orderId, nftId) => (dispatch) => {
  return api
    .post("/new-bid-placed", { orderData, orderId, nftId })
    .then((res) => {
      dispatch({ type: types.ORDERS_FETCHED, payload: [...res.ordersData] });
    })
    .catch((err) => {});
};
