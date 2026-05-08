"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { appBasePath } from "@/lib/base-path";

interface AuthProviderProps {
  children: ReactNode;
  session?: Session;
}

export default function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider basePath={`${appBasePath}/api/auth`} session={session}>
      {children}
    </SessionProvider>
  );
}
