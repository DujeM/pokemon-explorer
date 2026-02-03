import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { queryClient } from "./queryClient";
import { queryPersister } from "./queryPersister";
import { AppBootstrap } from "./bootstrap";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: 24 * 60 * 60 * 1000,
      }}
    >
      <BrowserRouter>
        <AppBootstrap>{children}</AppBootstrap>
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}
