"use client";
import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
    //   theme="dark"
      richColors
      closeButton
      expand
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border border-border",
          title: "text-foreground",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-foreground",
        },
      }}
    />
  );
}
