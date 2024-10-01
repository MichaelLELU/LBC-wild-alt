import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Ads from "./pages/Ads.tsx";
import AdDetail from "./pages/AdDetail.tsx";
import "./index.css";
import Category from "./pages/Category.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Ads />,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/ads/:id",
        element: <AdDetail />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/ads/${params.id}`),
      },
      {
        path: "/categorie/:id",
        element: <Category />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/category/${params.id}`),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
