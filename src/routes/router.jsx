import { createBrowserRouter } from "react-router";
import App from "../App.jsx";
import HomePage from "../pages/HomePage.jsx";
import PostDetailPage from "../pages/PostDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts/:id", element: <PostDetailPage /> },
    ],
  },
]);

export default router;
