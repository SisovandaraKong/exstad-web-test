import { useBaseQuery } from "../../services/use-base-query";
import {
  CreateScholarSocialLink,
  ScholarSocialLink,
  UpdateScholar,
  Scholar,
} from "../../types/scholar";
import { ScholarAchievementsResponse } from "../../types/achievement";
import { createApi } from "@reduxjs/toolkit/query/react";

export const scholarApi = createApi({
  reducerPath: "scholarApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Scholar", "ScholarSocialLink", "ScholarAchievement"],
  endpoints: (builder) => ({
    // GET all scholars
    getAllScholars: builder.query<Scholar[], void>({
      query: () => "/api/v1/scholars",
      transformResponse: (response: { scholars: Scholar[] }) =>
        response.scholars,
      providesTags: (result: Scholar[] | undefined) =>
        result
          ? [
              ...result.map(({ uuid }: Scholar) => ({
                type: "Scholar" as const,
                id: uuid,
              })),
              { type: "Scholar", id: "LIST" },
            ]
          : [{ type: "Scholar", id: "LIST" }],
    }),

    // GET scholars by status
    getScholarsByStatus: builder.query<Scholar[], string>({
      query: (status: string) => `/scholars/status/${status}`,
      transformResponse: (response: { scholars: Scholar[] }) =>
        response.scholars,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // GET scholar by uuid
    getScholarByUuid: builder.query<Scholar, string>({
      query: (uuid: string) => `/scholars/${uuid}`,
      providesTags: (
        _result: Scholar | undefined,
        _error: unknown,
        uuid: string
      ) => [{ type: "Scholar", id: uuid }],
    }),

    // GET scholar by username
    // getScholarByUsername: builder.query<Scholar, string>({
    //   query: (username) => `/scholars/username/${username}`,
    //   providesTags: (result, error, username) => [
    //     { type: "Scholar", id: `username-${username}` },
    //   ],
    // }),
    getScholarByUsername: builder.query<Scholar, string>({
      query: (username: string) => `/scholars/username/${username}`,
      providesTags: (
        _result: Scholar | undefined,
        _error: unknown,
        username: string
      ) => [{ type: "Scholar", id: `username-${username}` }],
    }),

    // Search scholars
    searchScholars: builder.query<
      Scholar[],
      { username?: string; name?: string }
    >({
      query: ({ username = "", name = "" }) =>
        `/scholars/search?username=${username}&name=${name}`,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // Count scholars
    countScholars: builder.query<number, void>({
      query: () => "/scholars/count",
      transformResponse: (response: { scholars: number }) => response.scholars,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // Get "me"
    getMe: builder.query<Scholar, void>({
      query: () => "/scholars/me",
      providesTags: [{ type: "Scholar", id: "me" }],
    }),

    // Update "me"
    updateMe: builder.mutation<Scholar, UpdateScholar>({
      query: (body: UpdateScholar) => ({
        url: "/scholars/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Scholar", id: "me" }],
    }),

    // Scholar social links
    getScholarSocialLinks: builder.query<ScholarSocialLink[], string>({
      query: (uuid: string) => `/scholars/${uuid}/social-links`,
      providesTags: (
        _result: ScholarSocialLink[] | undefined,
        _error: unknown,
        uuid: string
      ) => [{ type: "ScholarSocialLink", id: `scholar-${uuid}` }],
    }),

    addScholarSocialLink: builder.mutation<
      ScholarSocialLink,
      { uuid: string; body: CreateScholarSocialLink }
    >({
      query: ({
        uuid,
        body,
      }: {
        uuid: string;
        body: CreateScholarSocialLink;
      }) => ({
        url: `/scholars/${uuid}/social-links`,
        method: "POST",
        body,
      }),
      invalidatesTags: (
        _result: ScholarSocialLink | undefined,
        _error: unknown,
        { uuid }: { uuid: string }
      ) => [{ type: "ScholarSocialLink", id: `scholar-${uuid}` }],
    }),

    updateSocialLinkStatus: builder.mutation<
      ScholarSocialLink,
      { scholarUuid: string; socialLinkUuid: string; status: boolean }
    >({
      query: ({
        scholarUuid,
        socialLinkUuid,
        status,
      }: {
        scholarUuid: string;
        socialLinkUuid: string;
        status: boolean;
      }) => ({
        url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: (
        _result: ScholarSocialLink | undefined,
        _error: unknown,
        { scholarUuid }: { scholarUuid: string }
      ) => [{ type: "ScholarSocialLink", id: `scholar-${scholarUuid}` }],
    }),

    deleteSocialLink: builder.mutation<
      void,
      { scholarUuid: string; socialLinkUuid: string }
    >({
      query: ({
        scholarUuid,
        socialLinkUuid,
      }: {
        scholarUuid: string;
        socialLinkUuid: string;
      }) => ({
        url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
        method: "DELETE",
      }),
      invalidatesTags: (
        _result: void | undefined,
        _error: unknown,
        { scholarUuid }: { scholarUuid: string }
      ) => [{ type: "ScholarSocialLink", id: `scholar-${scholarUuid}` }],
    }),

    // Scholars by opening program
    getScholarsByOpeningProgram: builder.query<Scholar[], string>({
      query: (uuid: string) => `/scholars/${uuid}/opening-program`,
      transformResponse: (response: {
        "opening-program-scholars": Scholar[];
      }) => response["opening-program-scholars"],
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // Get scholar achievements
    getScholarAchievements: builder.query<ScholarAchievementsResponse, string>({
      query: (uuid: string) => `/api/v1/scholars/${uuid}/achievements`,
      providesTags: (
        _result: ScholarAchievementsResponse | undefined,
        _error: unknown,
        uuid: string
      ) => [{ type: "ScholarAchievement", id: uuid }],
    }),

    // completed course by opening program
    getScholarCompletedCourseByOpeningProgram: builder.query<
      unknown,
      { scholarUuid: string; openingProgramUuid: string }
    >({
      query: ({
        scholarUuid,
        openingProgramUuid,
      }: {
        scholarUuid: string;
        openingProgramUuid: string;
      }) =>
        `/api/v1/scholars/${scholarUuid}/completed-course/${openingProgramUuid}`,
      // Tagging the owning Scholar so related views can refetch if needed
      providesTags: (
        _result: unknown,
        _error: unknown,
        { scholarUuid }: { scholarUuid: string }
      ) => [{ type: "Scholar", id: scholarUuid }],
    }), // // Get specialist scholars
    // getSpecialistScholars: builder.query<Scholar[], string>({
    //   query: (uuid) => `/api/v1/scholars/specialists/${uuid}`,
    //   providesTags: [{ type: "Scholar", id: "SPECIALISTS" }],
    // }),
  }),
});

export const {
  useGetAllScholarsQuery,
  useGetScholarsByStatusQuery,
  useGetScholarByUuidQuery,
  useGetScholarByUsernameQuery,
  useSearchScholarsQuery,
  useCountScholarsQuery,
  useGetMeQuery,
  useUpdateMeMutation,
  useGetScholarSocialLinksQuery,
  useAddScholarSocialLinkMutation,
  useUpdateSocialLinkStatusMutation,
  useDeleteSocialLinkMutation,
  useGetScholarsByOpeningProgramQuery,
  useGetScholarAchievementsQuery,
  useGetScholarCompletedCourseByOpeningProgramQuery,
} = scholarApi;
