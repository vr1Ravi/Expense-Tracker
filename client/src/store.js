import { configureStore } from "@reduxjs/toolkit";
import item from "./slices/item_slice";
import { incomeApi } from "./components/apis/api.js";
const store = configureStore({
  reducer: {
    item,
    [incomeApi.reducerPath]: incomeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(incomeApi.middleware),
});

export default store;
