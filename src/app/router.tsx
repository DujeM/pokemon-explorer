import { Navigate, useRoutes } from "react-router-dom";
import { Explore } from "./routes/explore";
import { Layout } from "../shared/components/layout";
import Compare from "./routes/compare";

export function AppRouter() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/explore" replace />,
    },
    {
      path: "/explore",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Explore />,
        },
      ],
    },
    {
      path: "/compare",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Compare />,
        },
      ],
    },
    {
      path: "*",
      element: <div>404 – Not Found</div>,
    },
  ]);
}
