import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
  import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { queryClient } from "./queryClient";
import { queryPersister } from "./queryPersister";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: queryPersister, maxAge: 24 * 60 * 60 * 1000, }}>
      <BrowserRouter>{children}</BrowserRouter>
    </PersistQueryClientProvider>
  );
}
