import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Home from "./pages/User/Home";
import { ThemeProvider } from "./components/theme-provider";
import NotFound from "./pages/User/NotFound";
import UserLayout from "./layouts/UserLayout";
import Products from "./pages/User/Products";
import Deals from "./pages/User/Deals";
import Support from "./pages/User/Support";
import Aboutus from "./pages/User/Aboutus";
import Profile from "./pages/User/Profile";
import Login from "./pages/User/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />, // this should be changed to page ErrorPage
    children: [
      {
        path: "/",
        element: <UserLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "/products", element: <Products /> },
          { path: "/deals", element: <Deals /> },
          { path: "/support", element: <Support /> },
          { path: "/about-us", element: <Aboutus /> },
          { path: "/profile", element: <Profile /> },
          { path: "/login", element: <Login /> },
        ],
      },
      {
        path: "/admin",
        // element: <AdminLayout />,
        // children: [{ index: true, element: <AdminDashboard /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
