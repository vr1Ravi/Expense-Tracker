import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    showSidebar: false,
  },
  reducers: {
    setShowSideBar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setShowSideBar } = itemSlice.actions;

export default itemSlice.reducer;
