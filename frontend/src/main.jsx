import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
// import Home from "./pages/User/Home";
import { ThemeProvider } from "./components/theme-provider";
import NotFound from "./pages/User/NotFound";
import UserLayout from "./layouts/UserLayout";
// import Products from "./pages/User/Products";
// import Deals from "./pages/User/Deals";
// import Support from "./pages/User/Support";
// import Aboutus from "./pages/User/Aboutus";
// import Profile from "./pages/User/Profile";
// import Login from "./pages/Login";
// import Verify from "./pages/Verify";
// import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/User/Home"));
const Products = lazy(() => import("./pages/User/Products"));
const Deals = lazy(() => import("./pages/User/Deals"));
const Support = lazy(() => import("./pages/User/Support"));
const Aboutus = lazy(() => import("./pages/User/Aboutus"));
const Profile = lazy(() => import("./pages/User/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Verify = lazy(() => import("./pages/Verify"));
const SignUp = lazy(() => import("./pages/SignUp"));

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
          { path: "/signup", element: <SignUp /> },
          { path: "/login", element: <Login /> },
          { path: "/verify/:token", element: <Verify /> },
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
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
