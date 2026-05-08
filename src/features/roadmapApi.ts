/**
 * API slice for managing roadmaps (get, update).
 * Supports both "programs" and "opening-programs".
 *
 * Endpoints:
 * GET /{programType}/{uuid}/roadmaps
 * PUT /{programType}/{uuid}/roadmaps
 *
 * Example:
 * useGetAllRoadmapsQuery({ programType: "programs", programUuid })
 * useUpdateRoadmapsMutation()
 */

import { createApi } from "@reduxjs/toolkit/query/react"
import type { RoadmapPayload, RoadmapResponse } from "@/types/roadmap"
import { useBaseQuery } from "@/services/use-base-query"

type ProgramType = "programs" | "opening-programs"

export const roadmapApi = createApi({
  reducerPath: "roadmapApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Roadmaps"],

  endpoints: (builder) => ({
    /**
     * GET all roadmaps for a given program type and UUID
     */
    getAllRoadmaps: builder.query<
      RoadmapResponse,
      { programType: ProgramType; programUuid: string }
    >({
      query: ({ programType, programUuid }) =>
        `/${programType}/${programUuid}/roadmaps`,
      providesTags: (result, error, { programType, programUuid }) =>
        result
          ? [
              ...result.map((_, index) => ({
                type: "Roadmaps" as const,
                id: `${programType}-${programUuid}-${index}`,
              })),
              { type: "Roadmaps", id: `${programType}-${programUuid}-LIST` },
            ]
          : [{ type: "Roadmaps", id: `${programType}-${programUuid}-LIST` }],
    }),

    /**
     * PUT / update roadmaps for a given program type and UUID
     */
    updateRoadmaps: builder.mutation<
      void,
      { programType: ProgramType; programUuid: string; roadmaps: RoadmapPayload }
    >({
      query: ({ programType, programUuid, roadmaps }) => ({
        url: `/${programType}/${programUuid}/roadmaps`,
        method: "PUT",
        body: roadmaps,
      }),
      invalidatesTags: (result, error, { programType, programUuid }) => [
        { type: "Roadmaps", id: `${programType}-${programUuid}-LIST` },
      ],
    }),
  }),
})

export const { useGetAllRoadmapsQuery, useUpdateRoadmapsMutation } = roadmapApi
