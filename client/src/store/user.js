import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "user",
  initialState: {
    data: null,
    auth: false,
    cart: [],
  },
  reducers: {
    userAuthenticated: (user, action) => {
      user.auth = true;
      user.data = action.payload.data;
    },

    userLoggedOut: (user, action) => {
      user.data = null;
      user.auth = false;
    },

    userProfileUpdated: (user, action) => {
      const { firstname, lastname } = action.payload.data;
      user.data.firstname = firstname;
      user.data.lastname = lastname;
    },
  },
});

const { userAuthenticated, userLoggedOut, userProfileUpdated } = slice.actions;

export const authUser = (user) => {
  return userAuthenticated({ data: user });
};

export const logoutUser = () => {
  return userLoggedOut();
};

export const updateUserProfile = (data) => {
  return userProfileUpdated({ data });
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
