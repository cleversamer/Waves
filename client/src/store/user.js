import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "user",
  initialState: {
    data: {
      _id: null,
      email: null,
      firstname: null,
      lastname: null,
      history: [],
      verified: null,
    },
    auth: null,
    cart: [],
  },
  reducers: {},
});

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

export default slice.reducer;
