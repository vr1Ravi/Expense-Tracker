import { configureStore } from "@reduxjs/toolkit";
import income from "./slices/income_slice";
import { incomeApi } from "./components/apis/api.js";
const store = configureStore({
  reducer: {
    income,
    [incomeApi.reducerPath]: incomeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(incomeApi.middleware),
});

export default store;
