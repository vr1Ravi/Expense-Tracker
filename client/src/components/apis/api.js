import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["income"],
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: (page = 1) => `get-incomes?page=${page}`,
      providesTags: ["income"],
      transformResponse: (response) => response.response,
    }),
    getExpense: builder.query({
      query: (page = 1) => `get-expenses?page=${page}`,
      providesTags: ["expense"],
      transformResponse: (response) => response.response,
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: "add-income",
        method: "POST",
        body: newIncome,
      }),
      invalidatesTags: ["income"],
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "add-expense",
        method: "POST",
        body: newExpense,
      }),
      invalidatesTags: ["expense"],
    }),
    removeIncome: builder.mutation({
      query: (id) => ({
        url: `delete-income/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["income"],
    }),
    removeExpense: builder.mutation({
      query: (id) => ({
        url: `delete-expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});
export const {
  useGetIncomeQuery,
  useAddIncomeMutation,
  useRemoveIncomeMutation,
  useGetExpenseQuery,
  useAddExpenseMutation,
  useRemoveExpenseMutation,
} = incomeApi;
