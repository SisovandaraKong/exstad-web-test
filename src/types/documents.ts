import { Audit } from "./index";

export type Document = {
  name: string;
  mimeType: string;
  programSlug: string;
  gen: number;
  documentType: string;
  fileSize: number;
  uri: string;
  audit: Audit;
};
export type CreateDocument = {
  programSlug: string;
  gen: number;
  documentType: string;
  filename?: string;
  file: File;
};