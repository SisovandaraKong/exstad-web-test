import { createApi } from "@reduxjs/toolkit/query/react";
import { useBaseQuery } from "@/services/use-base-query";
import { TimelineType } from "@/types/opening-program";

function asString(v: unknown): string {
  return typeof v === "string" ? v : String(v ?? "");
}
function asStringOrEmpty(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function hasArrayData(v: unknown): v is { data: unknown[] } {
  return isRecord(v) && Array.isArray((v as { data?: unknown }).data);
}
function extractArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (hasArrayData(payload)) return payload.data;
  return [];
}

export const timeLineApi = createApi({
  reducerPath: "timeLineApi",
  baseQuery: useBaseQuery,
  tagTypes: ["Timeline"],
  endpoints: (builder) => ({
    getOpeningProgramTimelines: builder.query<TimelineType[], { uuid: string }>(
      {
        query: ({ uuid }: { uuid: string }) =>
          `opening-programs/${encodeURIComponent(uuid)}/timelines`,
        transformResponse: (response: unknown): TimelineType[] => {
          const arr = extractArray(response);
          return arr.map((item: unknown) => {
            const obj = isRecord(item) ? (item as Record<string, unknown>) : {};
            return {
              uuid: asString(obj.uuid),
              title: asString(obj.title),
              startDate: asStringOrEmpty(obj.startDate),
              endDate: asStringOrEmpty(obj.endDate),
            };
          });
        },
        providesTags: (
          result: TimelineType[] | undefined,
          _err: unknown,
          arg: { uuid: string }
        ) =>
          result
            ? [
                { type: "Timeline" as const, id: arg.uuid },
                ...result.map((t: TimelineType) => ({
                  type: "Timeline" as const,
                  id: t.uuid,
                })),
              ]
            : [{ type: "Timeline" as const, id: arg.uuid }],
      }
    ),
  }),
});

export const {
  useGetOpeningProgramTimelinesQuery,
  useLazyGetOpeningProgramTimelinesQuery,
} = timeLineApi;
