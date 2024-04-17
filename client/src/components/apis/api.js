import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://expense-tracker-backend-umber.vercel.app/api/v1/",
    // baseUrl: "http://localhost:5000/api/v1/",
  }),
  tagTypes: ["income", "expense", "transaction"],
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: (page = 1) => ({
        url: `get-incomes?page=${page}`,
        headers: { Authorization: localStorage.getItem("token") },
      }),
      providesTags: ["income"],
      transformResponse: (response) => response.response,
    }),
    getExpense: builder.query({
      query: (page = 1) => ({
        url: `get-expenses?page=${page}`,
        headers: { Authorization: localStorage.getItem("token") },
      }),
      providesTags: ["expense"],
      transformResponse: (response) => response.response,
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: "add-income",
        method: "POST",
        body: newIncome,
        headers: { Authorization: localStorage.getItem("token") },
      }),
      invalidatesTags: ["income", "transaction"],
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "add-expense",
        method: "POST",
        body: newExpense,
        headers: { Authorization: localStorage.getItem("token") },
      }),
      invalidatesTags: ["expense", "transaction"],
    }),
    removeIncome: builder.mutation({
      query: (id) => ({
        url: `delete-income/${id}`,
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") },
      }),

      invalidatesTags: ["income", "transaction"],
    }),
    removeExpense: builder.mutation({
      query: (id) => ({
        url: `delete-expense/${id}`,
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") },
      }),
      invalidatesTags: ["expense", "transaction"],
    }),
    getTransactions: builder.query({
      query: (page) => ({
        url: `get-transactions?page=${page}`,
        headers: { Authorization: localStorage.getItem("token") },
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
