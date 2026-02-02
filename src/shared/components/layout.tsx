import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="py-15 px-6 md:py-30 md:px-24">
        <Outlet />
      </main>
    </>
  );
}