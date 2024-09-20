import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
  activeNav: "Home",
  vidUrl: null,
  videoId: null,
  showprofilemenu: false,
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
    changeNav: (state, action) => {
      if (action.payload.navname === "fullscreen video") {
        state.activeNav = action.payload.navname;
        state.vidUrl = action.payload.videourl;
        state.videoId = action.payload.videoId;
        return;
      }
      state.activeNav = action.payload;
      console.log("acitve nav is ", action.payload);
    },
    toggleProMenu: (state, action) => {
      state.showprofilemenu = action.payload;
    },
  },
});

export const { login, logout, changeNav, toggleProMenu } = authSlice.actions;

export default authSlice.reducer;
