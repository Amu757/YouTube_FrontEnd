import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
  activeNav: "Home",
  videoInfo: null,
  showprofilemenu: false,
  profileUserName: null,
  allPlaylists: null,
  currentPlaylist: {
    id: null,
    name: null,
    description: null,
    owner: null,
    allVideos: [],
  },
  showPlaylistmenu: false,
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
        // state.activeNav = "fullscreen_video";
        state.videoInfo = action.payload;
        return;
      }
      state.activeNav = action.payload;
      // console.log("acitve nav is ", action.payload);
    },
    toggleProMenu: (state, action) => {
      state.showprofilemenu = action.payload;
    },
    changeUsername: (state, action) => {
      // console.log("updating the usernmae: ", action.payload);
      state.profileUserName = action.payload;
    },
    setAllPlaylists: (state, action) => {
      state.allPlaylists = action.payload;
      // console.log("setting data ", action.payload);
    },
    changePlaylist: (state, action) => {
      // console.log("changed playlist to ", action.payload);
      state.currentPlaylist.id = action.payload._id;
      state.currentPlaylist.name = action.payload.name;
      state.currentPlaylist.description = action.payload.description;
      state.currentPlaylist.owner = action.payload.owner;
      state.currentPlaylist.allVideos = action.payload.videos;
    },
    togglePlaylistmenu: (state, action) => {
      // console.log("playlist menu togged ", action.payload);
      state.showPlaylistmenu = action.payload;
    },
  },
});

export const {
  login,
  logout,
  changeNav,
  toggleProMenu,
  changeUsername,
  changePlaylist,
  togglePlaylistmenu,
  setAllPlaylists,
} = authSlice.actions;

export default authSlice.reducer;
