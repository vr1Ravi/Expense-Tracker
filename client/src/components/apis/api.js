import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://expense-tracker-backend-umber.vercel.app/api/v1/",
  }),
  tagTypes: ["income", "expense", "transaction"],
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: (page = 1, token) => ({
        url: `get-incomes?page=${page}`,
        prepareHeaders: (headers) => {
          headers.set("Authorization", token);
          return headers;
        },
      }),
      providesTags: ["income"],
      transformResponse: (response) => response.response,
    }),
    getExpense: builder.query({
      query: (page = 1, token) => ({
        url: `get-expenses?page=${page}`,
        prepareHeaders: (headers) => {
          headers.set("Authorization", token);
          return headers;
        },
      }),
      providesTags: ["expense"],
      transformResponse: (response) => response.response,
    }),
    addIncome: builder.mutation({
      query: (newIncome, token) => ({
        url: "add-income",
        method: "POST",
        body: newIncome,
        prepareHeaders: (headers) => {
          headers.set("Authorization", token);
          return headers;
        },
      }),
      invalidatesTags: ["income", "transaction"],
    }),
    addExpense: builder.mutation({
      query: (newExpense, token) => ({
        url: "add-expense",
        method: "POST",
        body: newExpense,
        prepareHeaders: (headers) => {
          headers.set("Authorization", token);
          return headers;
        },
      }),
      invalidatesTags: ["expense", "transaction"],
    }),
    removeIncome: builder.mutation({
      query: (id, token) => ({
        url: `delete-income/${id}`,
        method: "DELETE",
        prepareHeaders: (headers) => {
          headers.set("Authorization", token);
          return headers;
        },
      }),
      invalidatesTags: ["income", "transaction"],
    }),
    removeExpense: builder.mutation({
      query: (id, token) => ({
        url: `delete-expense/${id}`,
        method: "DELETE",
        prepareHeaders: (headers) => {
          headers.set("Authorization", token);
          return headers;
        },
      }),
      invalidatesTags: ["expense", "transaction"],
    }),
    getTransactions: builder.query({
      query: (page, token) => ({
        url: `get-transactions?page=${page}`,
        prepareHeaders: (headers) => {
          headers.set("Authorization", token);
          return headers;
        },
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
