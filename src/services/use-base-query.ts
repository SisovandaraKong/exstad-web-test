// services/baseQueryPublic.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use the proxy route in production, direct API in development
const getBaseUrl = () => {
  // If running on the client in production, use the proxy
  // if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  //   return "/api/proxy";
  // }

  // Otherwise use the direct API URL
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

export const useBaseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
});
