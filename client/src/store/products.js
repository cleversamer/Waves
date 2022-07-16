import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
  },
  reducers: {
    productsFetched: (products, action) => {
      products.list = action.payload.data;
    },
  },
});

const { productsFetched } = slice.actions;

export const addProducts = (products) => {
  return productsFetched({ data: products });
};

export const selectProducts = () => {
  return createSelector(
    (state) => state.products,
    (products) => products.list
  );
};

export default slice.reducer;
