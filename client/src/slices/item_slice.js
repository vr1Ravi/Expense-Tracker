import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    showSidebar: false,
    theme: localStorage.getItem("theme") || "light",
    token: null,
  },
  reducers: {
    setShowSideBar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setShowSideBar, setTheme, setToken } = itemSlice.actions;

export default itemSlice.reducer;
