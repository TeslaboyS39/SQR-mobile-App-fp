import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const initialState = {
  qurbansByType: [],
  categories: [],
  qurbans: [],
  oneQurban: {},
  cartItems: [],
  basket: [],
  orderList: [],
  orderDetail: {},
  tokenMidtrans: "",
  notification: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "categories/fetchSuccess":
      return {
        ...state,
        categories: action.payload,
      };
    case "orderList/fetchSuccess":
      return {
        ...state,
        orderList: action.payload,
      };
    case "orderList/fetchOneSuccess":
      return {
        ...state,
        orderDetail: action.payload,
      };
    case "categories/fetchByIdSuccess":
      return {
        ...state,
        categories: action.payload,
      };
    case "qurbans/fetchSuccess":
      return {
        ...state,
        qurbans: action.payload,
      };
    case "qurbans/fetchByTypeSuccess":
      return {
        ...state,
        qurbansByType: action.payload,
      };
    case "qurbans/fetchOneQurban":
      return {
        ...state,
        oneQurban: action.payload,
      };
    case "ADD_TO_CART_DETAIL":
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "token/addSuccess":
      return {
        ...state,
        tokenMidtrans: action.payload,
      };
    case "cart/clearCart":
      return {
        cartItems: [],
        basket: [],
      };
    case "notification/successFetch":
      return {
        ...state,
        notification: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
