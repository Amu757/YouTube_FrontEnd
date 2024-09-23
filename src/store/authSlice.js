import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
  activeNav: "Home",
  videoInfo: null,
  showprofilemenu: false,
  profileUserName: null,
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
    },
    changeNav: (state, action) => {
      if (action.payload.navname !== undefined) {
        state.activeNav = "fullscreen_video";
        state.videoInfo = action.payload;
        return;
      }
      state.activeNav = action.payload;
      console.log("acitve nav is ", action.payload);
    },
    toggleProMenu: (state, action) => {
      state.showprofilemenu = action.payload;
    },
    changeUsername: (state, action) => {
      console.log("updating the usernmae: ", action.payload);
      state.profileUserName = action.payload;
    },
  },
});

export const { login, logout, changeNav, toggleProMenu, changeUsername } =
  authSlice.actions;

export default authSlice.reducer;
