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
  reducers: {
    userAuthenticated: (user, action) => {
      user.auth = true;
      user.data = action.payload.data;
    },
  },
});

const { userAuthenticated } = slice.actions;

export const authUser = (user) => {
  return userAuthenticated({ data: user });
};

export const selectUserData = createSelector(
  (state) => state.user,
  (user) => user.data
);

export const selectUserCart = createSelector(
  (state) => state.user,
  (user) => user.cart
);

export const selectUserAuth = createSelector(
  (state) => state.user,
  (user) => user.auth
);

export default slice.reducer;
