import { useBaseQuery } from "@/services/use-base-query";
import { technologyType } from "@/types/master-program";
import { createApi } from "@reduxjs/toolkit/query/react";

// Backend payload
export type TechnologyPayload = {
  image: string;
  title: string;
  description: string;
};

export const technologyApi = createApi({
  reducerPath: "technologyApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Technology"],
  endpoints: (builder) => ({
    // ✅ GET all technologies
    getAllTechnology: builder.query<technologyType[], string>({
      query: (programUuid) => `/programs/${programUuid}/technologies`,
      providesTags: (result, error, uuid) =>
        result
          ? [
              ...result.map((_, index) => ({
                type: "Technology" as const,
                id: `${uuid}-${index}`,
              })),
              { type: "Technology", id: "LIST" },
            ]
          : [{ type: "Technology", id: "LIST" }],
    }),

    // ✅ PUT update technologies
    updateTechnology: builder.mutation<
      void,
      { programUuid: string; technology: TechnologyPayload[] }
    >({
      query: ({ programUuid, technology }) => ({
        url: `/programs/${programUuid}/technologies`,
        method: "PUT",
        body: technology,
      }),
      invalidatesTags: [{ type: "Technology", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllTechnologyQuery,
  useUpdateTechnologyMutation,
} = technologyApi;
