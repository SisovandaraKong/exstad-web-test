import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "../../services/use-base-query-bakong";

export type GenerateQrRequest = {
  amount: number;
};

export type GenerateQrResponse = {
  data: {
    qr: string;
    md5: string;
  };
  khqrstatus: {
    code: number;
    errorCode: string | null;
    message: string | null;
  };
};

export type CheckTransactionByMd5Response = {
  responseCode: number;
  responseMessage: string;
  errorCode: number | null;
  data: unknown;
};

export type GetQrImageRequest = {
  qr: string;
  md5: string;
};

export type GetQrImageResponse = Blob;

export const bakongApi = createApi({
  reducerPath: "bakongApi",
  baseQuery: useBaseQuery,
  endpoints: (builder) => ({
    generateQr: builder.mutation<GenerateQrResponse, GenerateQrRequest>({
      query: (body) => ({
        url: "/bakong/generate-qr",
        method: "POST",
        body,
      }),
    }),

    getQrImage: builder.mutation<GetQrImageResponse, GetQrImageRequest>({
      query: (body) => ({
        url: "/bakong/get-qr-image",
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),
    checkTransactionByMd5: builder.mutation<
      CheckTransactionByMd5Response,
      string
    >({
      query: (md5) => ({
        url: "/bakong/check-transaction",
        method: "POST",
        body: { md5 },
      }),
    }),
  }),
});

export const {
  useGenerateQrMutation,
  useGetQrImageMutation,
  useCheckTransactionByMd5Mutation,
} = bakongApi;
