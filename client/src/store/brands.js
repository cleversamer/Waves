import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "brands",
  initialState: {
    list: [],
  },
  reducers: {
    brandsAdded: (brands, action) => {
      brands.list = action.payload.data;
    },
  },
});

const { brandsAdded } = slice.actions;

export const addBrands = (data) => {
  return brandsAdded({ data });
};

export const selectBrands = createSelector(
  (state) => state.brands,
  (brands) => brands.list
);

export default slice.reducer;
