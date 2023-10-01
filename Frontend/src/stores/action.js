const BASE_URL = "https://9fe2-123-253-233-150.ngrok-free.app/";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      // console.log("masuk kesini");
      const response = await axios.get(BASE_URL + "categories");
      // console.log("lewat axios")
      if (response.status !== 200) {
        throw new Error("Fetch Failed");
      }

      const data = response.data;
      const action = {
        type: "categories/fetchSuccess",
        payload: data,
      };
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};

export const fetchQurbans = () => {
  return async (dispatch) => {
    try {
      // console.log("masuk kesini");
      const response = await axios.get(BASE_URL + "qurbans");
      // console.log("lewat axios")
      if (response.status !== 200) {
        throw new Error("Fetch Failed");
      }

      const data = response.data;
      const action = {
        type: "qurbans/fetchSuccess",
        payload: data,
      };
      // console.log(data , " di action")
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};

export const fetchOneQurban = (id) => {
  return async (dispatch) => {
    try {
      // console.log("masuk kesini");
      const response = await axios.get(BASE_URL + "qurbans/" + id);
      // console.log("lewat axios")
      if (response.status !== 200) {
        throw new Error("Fetch Failed");
      }

      const data = response.data;
      const action = {
        type: "qurbans/fetchOneQurban",
        payload: data,
      };
      // console.log(data , " di action")
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};

export const fetchNotif = () => {
  return async (dispatch) => {
    try {
      // console.log("masuk kesini");
      const response = await axios({
        url: BASE_URL + "notifications",
        method: "get",
        headers: {
          access_token: await SecureStore.getItemAsync("access_token"),
        },
      });
      // console.log("lewat axios")
      if (response.status !== 200) {
        throw new Error("Fetch Failed");
      }

      const data = response.data;
      // console.log(data)
      const action = {
        type: "notification/successFetch",
        payload: data,
      };
      // console.log(data , " di action")
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};

export const fetchQurbanByType = (filter) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL + "qurbans?filter=" + filter);
      if (response.status !== 200) {
        throw new Error("Fetch Failed");
      }

      const data = response.data;
      const action = {
        type: "qurbans/fetchByTypeSuccess",
        payload: data,
      };
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};

export const checkoutBasket = (input) => {
  return async (dispatch) => {
    console.log(input, "ini di dalem action");
    try {
      const response = await axios({
        url: BASE_URL + "orders",
        method: "post",
        data: input,
        headers: {
          access_token: await SecureStore.getItemAsync("access_token"),
        },
      });
      const result = await axios({
        url: BASE_URL + "token-midtrans",
        method: "post",
        data: {
          OrderId: response.data.findNewOrder.OrderId,
          totalPrice: response.data.findNewOrder.totalPrice,
        },
        headers: {
          access_token: await SecureStore.getItemAsync("access_token"),
        },
      });
      console.log(result.data);
      const action = {
        type: "token/addSuccess",
        payload: result.data.redirect_url,
      };
      dispatch(action);
      dispatch(fetchQurbans());
      dispatch(fetchOrderList());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const clearCart = () => {
  return {
    type: "cart/clearCart",
  };
};

export const register = (input) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        url: BASE_URL + "register",
        method: "post",
        data: input,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const loginData = (input) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        url: BASE_URL + "login",
        method: "post",
        data: input,
      });
      await SecureStore.setItemAsync(
        "access_token",
        response.data.access_token
      );
      await SecureStore.setItemAsync(
        "username",
        response.data.customer.username
      );
      await SecureStore.setItemAsync(
        "userId",
        String(response.data.customer.id)
      );
      await SecureStore.setItemAsync(
        "phoneNumber",
        response.data.customer.phoneNumber
      );
      await SecureStore.setItemAsync(
        "imageUrl",
        response.data.customer.imageUrl
      );
      await SecureStore.setItemAsync("email", response.data.customer.email);
      console.log(response.data);
    } catch (error) {
      throw error.response.data.message;
    }
  };
};

export const fetchOrderList = (input) => {
  return async (dispatch) => {
    try {
      // console.log("masuk kesini");
      const response = await axios({
        url: BASE_URL + "orders",
        method: "get",
        headers: {
          access_token: await SecureStore.getItemAsync("access_token"),
        },
      });
      // console.log("lewat axios")
      if (response.status !== 200) {
        throw new Error("Fetch Failed");
      }

      const data = response.data;
      const action = {
        type: "orderList/fetchSuccess",
        payload: data,
      };
      console.log(data);
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};

export const fetchOneOrderList = (id) => {
  return async (dispatch) => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      // console.log("masuk kesini");
      const response = await axios({
        url: BASE_URL + "orders/" + id,
        method: "get",
        headers: {
          access_token: access_token,
        },
      });
      // console.log("lewat axios")
      if (response.status !== 200) {
        throw new Error("Fetch Failed");
      }

      const data = response.data;
      const action = {
        type: "orderList/fetchOneSuccess",
        payload: data,
      };
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};

export const addCartDetail = (item) => ({
  type: "ADD_TO_CART_DETAIL",
  payload: item,
});

export const addToCart = (item) => ({
  type: "ADD_TO_CART",
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: "REMOVE_FROM_CART",
  payload: itemId,
});
