import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import Explore from "@/app/routes/explore";

function wrapper({ children }: PropsWithChildren) {
  return (
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </MemoryRouter>
  );
}

test("renders pokemon list", async () => {
  render(<Explore />, { wrapper });
  expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
});
