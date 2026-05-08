/** RTK Query API for current addresses */
import { useBaseQuery } from "../../services/use-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export type CurrentAddress = {
  uuid: string;
  englishName: string;
  khmerName: string;
};

export const currentAddressApi = createApi({
  reducerPath: "currentAddressApi",
  baseQuery: useBaseQuery,
  tagTypes: ["CurrentAddress"],
  endpoints: (build) => ({
    getCurrentAddresses: build.query<CurrentAddress[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({
                type: "CurrentAddress" as const,
                id: uuid,
              })),
              { type: "CurrentAddress", id: "LIST" },
            ]
          : [{ type: "CurrentAddress", id: "LIST" }],
    }),
    getCurrentAddressByUuid: build.query<CurrentAddress, string>({
      query: (uuid) => ({
        url: `/${encodeURIComponent(uuid)}`,
        method: "GET",
      }),
      providesTags: (result, _err, uuid) => [
        { type: "CurrentAddress", id: uuid },
      ],
    }),
  }),
});

export const {
  useGetCurrentAddressesQuery,
  useGetCurrentAddressByUuidQuery,
  util: currentAddressApiUtil,
} = currentAddressApi;
