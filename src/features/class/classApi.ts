import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "../../services/use-base-query";
import { Audit } from "../../types/audit/audit";

export type ClassItem = {
  room: string;
  uuid: string;
  instructor: string | null;
  classCode: string;
  telegram: string;
  openingProgramName: string;
  shift: string;
  isWeekend: boolean;
  totalSlot: number;
  startTime: string;
  endTime: string;
  isEnabled: boolean;
  audit: Audit;
};

export type GetClassesResponse = {
  classes: ClassItem[];
};

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: useBaseQuery,
  endpoints: (builder) => ({
    getClassesByOpeningProgramTitle: builder.query<GetClassesResponse, string>({
      query: (openingProgramTitle) => ({
        url: `/classes/opening-program/${openingProgramTitle}`,
        method: "GET",
      }),
    }),

    getClassesByOpeningProgramUuid: builder.query<GetClassesResponse, string>({
      query: (openingProgramUuid) => ({
        url: `/classes/opening-program-uuid/${openingProgramUuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetClassesByOpeningProgramTitleQuery, useGetClassesByOpeningProgramUuidQuery } = classApi;

