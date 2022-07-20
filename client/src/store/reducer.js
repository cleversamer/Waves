import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import productsReducer from "./products";
import brandsReducer from "./brands";

export default combineReducers({
  user: userReducer,
  products: productsReducer,
  brands: brandsReducer,
});
