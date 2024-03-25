import { createSlice } from "@reduxjs/toolkit";

export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    income: [],
    error: null,
  },
  reducers: {
    addIncomeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addIncomeSuccess: (state, action) => {
      state.loading = false;
      const income = state.income;
      income.push(action.payload);
      state.income = income;
    },
    addIncomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeIncomeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeIncomeSuccess: (state, action) => {
      state.loading = false;
      const income = state.income;
      income.push(action.payload);
      state.income = income;
    },
    removeIncomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getIncomeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getIncomeSuccess: (state, action) => {
      state.loading = false;
      const income = state.income;
      income.push(action.payload);
      state.income = income;
    },
    getIncomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addIncomeFailure, addIncomeRequest, addIncomeSuccess } =
  incomeSlice.actions;

export default incomeSlice.reducer;
