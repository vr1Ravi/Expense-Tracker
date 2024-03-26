import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: (page = 1) => `get-incomes?page=${page}`,
      transformResponse: (response) => response.response,
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: "add-income",
        method: "POST",
        body: newIncome,
      }),
    }),
  }),
});
export const { useGetIncomeQuery, useAddIncomeMutation } = incomeApi;
