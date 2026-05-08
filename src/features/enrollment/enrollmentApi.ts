import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "@/services/use-base-query";
import { Enrollment } from "@/types/enrollment";
import { Audit } from "@/types/audit";

export type EnrollmentRequest = {
  englishName: string;
  khmerName: string;
  openingProgramUuid: string;
  classUuid: string;
  amount: number;
  gender: string;
  dob: string;
  phoneNumber: string;
  email: string;
  avatar?: string;
  province?: string;
  currentAddress: string;
  university: string;
  isScholar: boolean;
  educationQualification: string;
  extra?: Record<string, string> | null;
};

export type EnrollmentDetail = {
  uuid: string;
  englishName: string;
  khmerName: string;
  program: string;
  amount: number;
  _class: {
    room: string | null;
    uuid: string;
    instructor: string | null;
    classCode: string;
    telegram: string | null;
    openingProgramName: string | null;
    shift: string | null;
    isWeekend: boolean;
    totalSlot: number | null;
    startTime: string | null;
    endTime: string | null;
    isEnabled: boolean;
    audit: Audit;
  };
  gender: string;
  dob: string;
  phoneNumber: string;
  email: string;
  avatar?: string | null;
  province?: string | null;
  currentAddress: string;
  university: string;
  educationQualification: string;
  extra?: Record<string, string>;
  isPaid: boolean;
  isInterviewed: boolean;
  isAchieved: boolean;
  isPassed: boolean;
  isScholar: boolean;
  audit: Audit;
};

// PATCH body
export type UpdateEnrollmentBody = {
  englishName?: string;
  khmerName?: string;
  program?: string;
  gender?: string;
  dob?: string;
  amount?: number | null;
  phoneNumber?: string;
  email?: string;
  avatar?: string | null;
  province?: string | null;
  currentAddress?: string;
  university?: string;
  educationQualification?: string;
  extra?: Record<string, string>;
  isPaid?: boolean;
  isInterviewed?: boolean;
  isAchieved?: boolean;
  isPassed?: boolean;
};

export type UpdateEnrollmentRequest = {
  uuid: string;
  body: UpdateEnrollmentBody;
};

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  tagTypes: ["Enrollment"],
  baseQuery: useBaseQuery,
  endpoints: (builder) => ({
    createEnrollment: builder.mutation<Enrollment, EnrollmentRequest>({
      query: (body) => ({
        url: "/enrollments",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Enrollment", id: "LIST" }],
    }),

    getAllEnrollmentsByProgram: builder.query<Enrollment[], string>({
      query: (uuid) => `/enrollments/${uuid}/all`,
      transformResponse: (response: { enrollments?: Enrollment[] }) =>
        response.enrollments ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({
                type: "Enrollment" as const,
                id: uuid,
              })),
              { type: "Enrollment", id: "LIST" },
            ]
          : [{ type: "Enrollment", id: "LIST" }],
    }),

    updateEnrollmentByUuid: builder.mutation<
      EnrollmentDetail,
      UpdateEnrollmentRequest
    >({
      query: ({ uuid, body }) => ({
        url: `/enrollments/${uuid}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, { uuid }) => [
        { type: "Enrollment", id: uuid },
        { type: "Enrollment", id: "LIST" },
      ],
    }),

    getEnrollmentByUuid: builder.query<EnrollmentDetail, string>({
      query: (uuid) => `/enrollments/${uuid}`,
    }),
  }),
});

export const {
  useCreateEnrollmentMutation,
  useUpdateEnrollmentByUuidMutation,
  useGetEnrollmentByUuidQuery,
  useGetAllEnrollmentsByProgramQuery,
} = enrollmentApi;
