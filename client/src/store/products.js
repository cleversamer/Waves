import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "products",
  initialState: {
    paginated: [],
    bySold: [],
    byDate: [],
  },
  reducers: {
    productsPaginated: (products, action) => {
      products.paginated = action.payload.data;
    },

    productsAddedBySold: (products, action) => {
      products.bySold = action.payload.data;
    },

    productsAddedByDate: (products, action) => {
      products.byDate = action.payload.data;
    },
  },
});

const { productsPaginated, productsAddedBySold, productsAddedByDate } =
  slice.actions;

export const addPaginatedProducts = (products) => {
  return productsPaginated({ data: products });
};

export const addProductsByDate = (products) => {
  return productsAddedByDate({ data: products });
};

export const addProductsBySold = (products) => {
  return productsAddedBySold({ data: products });
};

export const selectProductsByDate = () => {
  return createSelector(
    (state) => state.products,
    (products) => products.byDate
  );
};

export const selectProductsBySold = () => {
  return createSelector(
    (state) => state.products,
    (products) => products.bySold
  );
};

export default slice.reducer;
