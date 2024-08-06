import ChatRoom from "@/components/chat/ChatRoom";
import HomePage from "@/components/homepage/HomePage";
import AppLayout from "@/layouts/AppLayout";
import {
  type RouteObject,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();
  throw error;
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    // @ts-expect-error unnecessary null returned
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/chat",
        element: <ChatRoom />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
