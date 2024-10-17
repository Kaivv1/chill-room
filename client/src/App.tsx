import { ThemeProvider } from "./contexts/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { apiCheckIfRoomExists } from "./api/room";
import { getErrorObj } from "./helpers/error";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    element: <Root />,
    path: "/",
    children: [
      { element: <Home />, index: true },
      {
        element: <Room />,
        path: "room",
        loader: async ({ request }) => {
          const room_id = new URL(request.url).searchParams.get("room_id");
          const user_id = new URL(request.url).searchParams.get("user_id");
          if (!room_id)
            throw new Response("no room_id provided", { status: 404 });
          if (!user_id)
            throw new Response("no user_id provided", { status: 404 });
          try {
            const { exists } = (await apiCheckIfRoomExists(room_id)).data;
            if (!exists) {
              throw new Response("this room no longer or doesn't exist", {
                status: 404,
              });
            }
            return { user_id, room_id };
          } catch (error) {
            if (error instanceof Response) {
              throw error;
            }
            const { msg, code } = getErrorObj(error);
            throw new Response(msg, {
              status: code,
            });
          }
        },
        errorElement: <Error />,
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
