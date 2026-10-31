import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import MainLayouts from "../layoutes/MainLayouts";
import AddTaskPage from "../pages/AddTaskPage";
import AllTaskPage from "../pages/AllTaskPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path:"/add-tasks",
        element:<AddTaskPage />
      },
      {
        path:"/all-tasks",
        element:<AllTaskPage />
      }
    ],
  },
]);

export default router;
