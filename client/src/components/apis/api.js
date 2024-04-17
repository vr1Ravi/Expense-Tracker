import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/",
  }),
  tagTypes: ["income", "expense", "transaction"],
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: (page = 1) => ({
        url: `get-incomes?page=${page}`,
        credentials: "include",
      }),
      providesTags: ["income"],
      transformResponse: (response) => response.response,
    }),
    getExpense: builder.query({
      query: (page = 1) => ({
        url: `get-expenses?page=${page}`,
        credentials: "include",
      }),
      providesTags: ["expense"],
      transformResponse: (response) => response.response,
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: "add-income",
        method: "POST",
        body: newIncome,
        credentials: "include",
      }),
      invalidatesTags: ["income", "transaction"],
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "add-expense",
        method: "POST",
        body: newExpense,
        credentials: "include",
      }),
      invalidatesTags: ["expense", "transaction"],
    }),
    removeIncome: builder.mutation({
      query: (id) => ({
        url: `delete-income/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["income", "transaction"],
    }),
    removeExpense: builder.mutation({
      query: (id) => ({
        url: `delete-expense/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["expense", "transaction"],
    }),
    getTransactions: builder.query({
      query: (page) => ({
        url: `get-transactions?page=${page}`,
        credentials: "include",
      }),
      providesTags: ["transaction"],
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
  useGetTransactionsQuery,
} = incomeApi;
