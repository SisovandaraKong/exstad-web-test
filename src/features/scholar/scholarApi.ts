import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "../../services/use-base-query";
import type { ScholarResponse } from "../../types/scholar/scholarType";

export const scholarApi = createApi({
  reducerPath: "scholarApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Scholar"],
  endpoints: (builder) => ({
    getScholarByUsername: builder.query<ScholarResponse, string>({
      query: (username) =>
        `/scholars/username/${encodeURIComponent(username)}`,
      providesTags: (_result, _err, username) => [
        { type: "Scholar", id: username },
      ],
    }),
  }),
});

export const { useGetScholarByUsernameQuery } = scholarApi;