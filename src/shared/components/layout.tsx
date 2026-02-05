import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="py-7 md:py-15 px-3 md:px-6 max-w-7xl mx-auto w-full md:px-0">
        <Outlet />
      </main>
    </>
  );
}
