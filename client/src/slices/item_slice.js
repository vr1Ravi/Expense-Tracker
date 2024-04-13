import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    showSidebar: false,
    theme: localStorage.getItem("theme") || "light",
  },
  reducers: {
    setShowSideBar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setShowSideBar, setTheme } = itemSlice.actions;

export default itemSlice.reducer;
