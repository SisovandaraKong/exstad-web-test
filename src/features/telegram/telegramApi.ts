import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const telegramApi = createApi({
  reducerPath: "telegramApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    sendTelegramMessage: builder.mutation<
      void,
      { message: string; threadId?: number; photoUrl?: string }
    >({
      query: ({ message, threadId, photoUrl }) => ({
        url: "telegram",
        method: "POST",
        body: { message, threadId, photoUrl },
      }),
    }),
  }),
});

export const { useSendTelegramMessageMutation } = telegramApi;
