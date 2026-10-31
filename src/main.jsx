import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/AppRoutes.jsx";
import { TaskProvider } from "./context/taskContext.jsx";

createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <RouterProvider router={router} />
  </TaskProvider>,
);
