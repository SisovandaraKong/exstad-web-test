// import { useBaseQuery } from "@/services/use-base-query";
// import { CreateScholarSocialLink, ScholarSocialLink, UpdateScholar } from "@/types/scholar";
// import { Scholar } from "@/types/scholar/scholar";
// import { createApi } from "@reduxjs/toolkit/query/react";

// export const scholarApi = createApi({
//   reducerPath: "scholarApi",
//   baseQuery: useBaseQuery,
//   tagTypes: ["Scholar", "ScholarSocialLink"],
//   endpoints: (builder) => ({
//     // GET all scholars
//     getAllScholars: builder.query<Scholar[], void>({
//       query: () => "/scholars",
//       transformResponse: (response: { scholars: Scholar[] }) =>
//         response.scholars,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ uuid }) => ({
//                 type: "Scholar" as const,
//                 id: uuid,
//               })),
//               { type: "Scholar", id: "LIST" },
//             ]
//           : [{ type: "Scholar", id: "LIST" }],
//     }),

//     // GET scholars by status
//     getScholarsByStatus: builder.query<Scholar[], string>({
//       query: (status) => `/scholars/status/${status}`,
//       transformResponse: (response: { scholars: Scholar[] }) =>
//         response.scholars,
//       providesTags: [{ type: "Scholar", id: "LIST" }],
//     }),

//     // GET scholar by uuid
//     getScholarByUuid: builder.query<Scholar, string>({
//       query: (uuid) => `/scholars/${uuid}`,
//       providesTags: (result, error, uuid) => [{ type: "Scholar", id: uuid }],
//     }),

//     // GET scholar by username
//     getScholarByUsername: builder.query<Scholar, string>({
//       query: (username) => `api/v1/scholars/username/${username}`,
//       providesTags: (result, error, username) => [
//         { type: "Scholar", id: `username-${username}` },
//       ],
//     }),

//     // Search scholars
//     searchScholars: builder.query<
//       Scholar[],
//       { username?: string; name?: string }
//     >({
//       query: ({ username = "", name = "" }) =>
//         `/scholars/search?username=${username}&name=${name}`,
//       providesTags: [{ type: "Scholar", id: "LIST" }],
//     }),

//     // Count scholars
//     countScholars: builder.query<number, void>({
//       query: () => "/scholars/count",
//       transformResponse: (response: { scholars: number }) => response.scholars,
//       providesTags: [{ type: "Scholar", id: "LIST" }],
//     }),

//     // Get "me"
//     getMe: builder.query<Scholar, void>({
//       query: () => "/scholars/me",
//       providesTags: [{ type: "Scholar", id: "me" }],
//     }),

//     // Update "me"
//     updateMe: builder.mutation<Scholar, UpdateScholar>({
//       query: (body) => ({
//         url: "/scholars/me",
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: [{ type: "Scholar", id: "me" }],
//     }),

//     // Scholar social links
//     getScholarSocialLinks: builder.query<ScholarSocialLink[], string>({
//       query: (uuid) => `api/v1/scholars/${uuid}/social-links`,
//       providesTags: (result, error, uuid) => [
//         { type: "ScholarSocialLink", id: `scholar-${uuid}` },
//       ],
//     }),

//     addScholarSocialLink: builder.mutation<
//       ScholarSocialLink,
//       { uuid: string; body: CreateScholarSocialLink }
//     >({
//       query: ({ uuid, body }) => ({
//         url: `/scholars/${uuid}/social-links`,
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: (result, error, { uuid }) => [
//         { type: "ScholarSocialLink", id: `scholar-${uuid}` },
//       ],
//     }),

//     updateSocialLinkStatus: builder.mutation<
//       ScholarSocialLink,
//       { scholarUuid: string; socialLinkUuid: string; status: boolean }
//     >({
//       query: ({ scholarUuid, socialLinkUuid, status }) => ({
//         url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
//         method: "PATCH",
//         body: status,
//       }),
//       invalidatesTags: (result, error, { scholarUuid }) => [
//         { type: "ScholarSocialLink", id: `scholar-${scholarUuid}` },
//       ],
//     }),

//     deleteSocialLink: builder.mutation<
//       void,
//       { scholarUuid: string; socialLinkUuid: string }
//     >({
//       query: ({ scholarUuid, socialLinkUuid }) => ({
//         url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, { scholarUuid }) => [
//         { type: "ScholarSocialLink", id: `scholar-${scholarUuid}` },
//       ],
//     }),

//     // Scholars by opening program
//     getScholarsByOpeningProgram: builder.query<Scholar[], string>({
//       query: (uuid) => `/scholars/${uuid}/opening-program`,
//       transformResponse: (response: {
//         "opening-program-scholars": Scholar[];
//       }) => response["opening-program-scholars"],
//       providesTags: [{ type: "Scholar", id: "LIST" }],
//     }),
//   }),
// });

// export const {
//   useGetAllScholarsQuery,
//   useGetScholarsByStatusQuery,
//   useGetScholarByUuidQuery,
//   useGetScholarByUsernameQuery,
//   useSearchScholarsQuery,
//   useCountScholarsQuery,
//   useGetMeQuery,
//   useUpdateMeMutation,
//   useGetScholarSocialLinksQuery,
//   useAddScholarSocialLinkMutation,
//   useUpdateSocialLinkStatusMutation,
//   useDeleteSocialLinkMutation,
//   useGetScholarsByOpeningProgramQuery,
// } = scholarApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "@/services/use-base-query";
import type {
  Scholar,
  UpdateScholar,
  ScholarSocialLink,
  CreateScholarSocialLink,
} from "@/types/scholar";
import { ScholarAchievementsResponse } from "@/types/achievement";
import { CompletedCourse, Certificate } from "@/types/portfolio";
import { MasterProgramType } from "@/types/master-program";

// Extended type for API response that may include soft-delete fields
type ProgramResponse = Omit<MasterProgramType, "status"> & {
  isDeleted?: boolean;
  status?: "draft" | "active" | "archived" | "DELETED";
};

// Optional: lightweight type for Opening Program
export type OpeningProgram = {
  uuid: string;
  programName?: string;
  name?: string;
  generation?: number;
};

export const StudentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: useBaseQuery,
  tagTypes: [
    "Scholar",
    "ScholarSocialLink",
    "ScholarAchievement",
    "OpeningProgram",
  ],

  endpoints: (builder) => ({
    // 🔹 GET all scholars
    getAllScholars: builder.query<Scholar[], void>({
      query: () => `/scholars`,
      transformResponse: (response: { scholars: Scholar[] }) =>
        response.scholars,
      providesTags: (result) =>
        result && result.length
          ? [
              ...result.map(({ uuid }) => ({
                type: "Scholar" as const,
                id: uuid,
              })),
              { type: "Scholar", id: "LIST" },
            ]
          : [{ type: "Scholar", id: "LIST" }],
    }),

    // 🔹 GET scholars by status
    getScholarsByStatus: builder.query<Scholar[], string>({
      query: (status) => `/scholars/status/${status}`,
      transformResponse: (response: { scholars: Scholar[] }) =>
        response.scholars,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // 🔹 GET scholar by UUID
    getScholarByUuid: builder.query<Scholar, string>({
      query: (uuid) => `/scholars/${uuid}`,
      providesTags: (result, error, uuid) => [{ type: "Scholar", id: uuid }],
    }),

    // 🔹 GET scholar by username
    getScholarByUsername: builder.query<Scholar, string>({
      query: (username) => `/scholars/username/${username}`,
      providesTags: (result, error, username) => [
        { type: "Scholar", id: `username-${username}` },
      ],
    }),

    // 🔹 Search scholars
    searchScholars: builder.query<
      Scholar[],
      { username?: string; name?: string }
    >({
      query: ({ username = "", name = "" }) =>
        `/scholars/search?username=${username}&name=${name}`,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // 🔹 Count scholars
    countScholars: builder.query<number, void>({
      query: () => `/scholars/count`,
      transformResponse: (response: { scholars: number }) => response.scholars,
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // 🔹 GET current user by UUID (since /me doesn’t exist)
    getScholarByUuidForMe: builder.query<Scholar, string>({
      query: (uuid) => `/scholars/${uuid}`,
      providesTags: (result, error, uuid) => [{ type: "Scholar", id: uuid }],
    }),

    // 🔹 UPDATE scholar (by UUID)
    updateScholar: builder.mutation<
      Scholar,
      { uuid: string; body: UpdateScholar }
    >({
      query: ({ uuid, body }) => ({
        url: `/scholars/${uuid}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: "Scholar", id: uuid },
        { type: "Scholar", id: "LIST" },
      ],
    }),

    // 🔹 Social links (GET)
    getScholarSocialLinks: builder.query<ScholarSocialLink[], string>({
      query: (uuid) => `/scholars/${uuid}/social-links`,
      providesTags: (result, error, uuid) => [
        { type: "ScholarSocialLink", id: `scholar-${uuid}` },
      ],
    }),

    // 🔹 Add new social link
    addScholarSocialLink: builder.mutation<
      ScholarSocialLink,
      { uuid: string; body: CreateScholarSocialLink }
    >({
      query: ({ uuid, body }) => ({
        url: `/scholars/${uuid}/social-links`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: "ScholarSocialLink", id: `scholar-${uuid}` },
      ],
    }),

    // 🔹 Update social link
    updateSocialLinkStatus: builder.mutation<
      ScholarSocialLink,
      { scholarUuid: string; socialLinkUuid: string; status: boolean }
    >({
      query: ({ scholarUuid, socialLinkUuid, status }) => ({
        url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
        method: "PATCH",
        body: { isActive: status },
      }),
      invalidatesTags: (result, error, { scholarUuid }) => [
        { type: "ScholarSocialLink", id: `scholar-${scholarUuid}` },
      ],
    }),

    // 🔹 Delete social link
    deleteSocialLink: builder.mutation<
      void,
      { scholarUuid: string; socialLinkUuid: string }
    >({
      query: ({ scholarUuid, socialLinkUuid }) => ({
        url: `/scholars/${scholarUuid}/social-link/${socialLinkUuid}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { scholarUuid }) => [
        { type: "ScholarSocialLink", id: `scholar-${scholarUuid}` },
      ],
    }),

    // 🔹 Scholars by opening program
    getScholarsByOpeningProgram: builder.query<Scholar[], string>({
      query: (uuid) => `/scholars/${uuid}/opening-program`,
      transformResponse: (response: {
        "opening-program-scholars": Scholar[];
      }) => response["opening-program-scholars"],
      providesTags: [{ type: "Scholar", id: "LIST" }],
    }),

    // 🔹 Get scholar achievements
    getScholarAchievements: builder.query<ScholarAchievementsResponse, string>({
      query: (uuid) => `/scholars/${uuid}/achievements`,
      providesTags: (result, error, uuid) => [
        { type: "ScholarAchievement", id: uuid },
      ],
    }),

    // 🔹 Get scholar completed courses
    getScholarCompletedCourses: builder.query<CompletedCourse[], string>({
      query: (uuid) => `/scholars/${uuid}/completed-courses`,
      transformResponse: (response: { completedCourses: CompletedCourse[] }) =>
        response.completedCourses,
      providesTags: (result, error, uuid) => [
        { type: "Scholar", id: `completed-courses-${uuid}` },
      ],
    }),

    // 🔹 Get scholar certificates (accept bare array or wrapped)
    getScholarCertificates: builder.query<Certificate[], string>({
      query: (uuid) => `/certificates/scholars/${uuid}`,
      transformResponse: (
        response: Certificate[] | { certificates: Certificate[] }
      ) => (Array.isArray(response) ? response : response?.certificates ?? []),
      providesTags: (result, error, uuid) => [
        { type: "Scholar", id: `certificates-${uuid}` },
      ],
    }),

    // 🔹 Get opening program by UUID
    getOpeningProgramByUuid: builder.query<OpeningProgram, string>({
      query: (uuid) => `/opening-programs/${uuid}`,
      providesTags: (result, error, uuid) => [
        { type: "OpeningProgram", id: uuid },
      ],
    }),

    // 🔹 GET all programs
    getAllPrograms: builder.query<ProgramResponse[], void>({
      query: () => `/programs`,
      transformResponse: (res: { programs: ProgramResponse[] }) =>
        (res.programs ?? []).filter(
          (p: ProgramResponse) => !p?.isDeleted && p?.status !== "DELETED"
        ),
      providesTags: (result) =>
        result && result.length
          ? [
              ...result.map((p: ProgramResponse) => ({
                type: "OpeningProgram" as const,
                id: p.uuid,
              })),
              { type: "OpeningProgram" as const, id: "LIST" },
            ]
          : [{ type: "OpeningProgram" as const, id: "LIST" }],
    }),

    // 🔹 GET all scholars by program UUID
    getScholarsByProgramUuid: builder.query<Scholar[], string>({
      query: (programUuid) => `/scholars/program/${programUuid}`,
      transformResponse: (
        response: Scholar[] | { scholars: Scholar[] } | Scholar
      ): Scholar[] => {
        // handle all shapes: array | {scholars: []} | single object
        if (Array.isArray(response)) return response;
        if (
          response &&
          "scholars" in response &&
          Array.isArray(response.scholars)
        )
          return response.scholars;
        if (response && typeof response === "object")
          return [response as Scholar];
        return [];
      },
      providesTags: (result, error, programUuid) => [
        { type: "Scholar", id: `program-${programUuid}` },
        { type: "Scholar", id: "LIST" },
      ],
    }),

    // 🔹 DELETE program by UUID
    deleteProgram: builder.mutation<{ success?: boolean }, string>({
      query: (uuid) => ({
        url: `/programs/${uuid}/delete`,
        method: "PUT",
      }),
      invalidatesTags: (_res, _err, uuid) => [
        { type: "OpeningProgram", id: uuid },
        { type: "OpeningProgram", id: "LIST" },
      ],
      async onQueryStarted(uuid, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          StudentApi.util.updateQueryData(
            "getAllPrograms",
            undefined,
            (draft: ProgramResponse[]) => {
              const i = draft.findIndex(
                (p: ProgramResponse) => p?.uuid === uuid
              );
              if (i !== -1) draft.splice(i, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllScholarsQuery,
  useGetScholarsByStatusQuery,
  useGetScholarByUuidQuery,
  useGetScholarByUsernameQuery,
  useSearchScholarsQuery,
  useCountScholarsQuery,
  useGetScholarByUuidForMeQuery,
  useUpdateScholarMutation,
  useGetScholarSocialLinksQuery,
  useAddScholarSocialLinkMutation,
  useUpdateSocialLinkStatusMutation,
  useDeleteSocialLinkMutation,
  useGetScholarsByOpeningProgramQuery,
  useGetScholarAchievementsQuery,
  useGetScholarCompletedCoursesQuery,
  useGetScholarCertificatesQuery,
  useGetOpeningProgramByUuidQuery,
  useGetAllProgramsQuery,
  useGetScholarsByProgramUuidQuery,
  useLazyGetScholarsByProgramUuidQuery,
  useDeleteProgramMutation,
} = StudentApi;
