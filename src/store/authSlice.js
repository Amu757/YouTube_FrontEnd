import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
  activeNav: "home",
  profileIsCliked:false,
};

const authSlice = createSlice({
  name: "auth1",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.data = null;
      console.log("inside authslice logout method reset done");
    },
    toggleNav: (state, action) => {
      state.activeNav = action.payload;
      console.log("acitve nav is ",action.payload)
    },
    profileCliked: (state) => {
      state.profileIsCliked =  !state.profileIsCliked;
      console.log("you clicked profile, showwing options ")
    },

  },
});

export const { login, logout, toggleNav,profileCliked } = authSlice.actions;

export default authSlice.reducer;
