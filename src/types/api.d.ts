import { Scholar } from "./portfolio";

declare module "@/components/student/StudentApi" {
  interface ScholarResponse {
    data: Scholar | undefined;
    isLoading: boolean;
    isError: boolean;
  }
}
