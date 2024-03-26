import { createSlice } from "@reduxjs/toolkit";

export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomes: [],
    income: null,
    error: null,
  },
  reducers: {
    removeIncomeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeIncomeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    removeIncomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getIncomesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getIncomesSuccess: (state, action) => {
      state.loading = false;
      state.incomes = action.payload;
    },
    getIncomesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addIncomeFailure,
  addIncomeRequest,
  addIncomeSuccess,
  removeIncomeFailure,
  removeIncomeSuccess,
  removeIncomeRequest,
} = incomeSlice.actions;

export default incomeSlice.reducer;
