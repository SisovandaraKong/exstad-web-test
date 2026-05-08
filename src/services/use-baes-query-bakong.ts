import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const useBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_BAKONG_URL,
});
