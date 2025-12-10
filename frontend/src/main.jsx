import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import NotFound from "./pages/User/NotFound";
import { Toaster } from "react-hot-toast";
// import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import VerifyResult from "./pages/VerifyResult";
import VerifyStatus from "./pages/VerifyStatus";
import AuthSuccess from "./pages/AuthSuccess";
import AdminRoute from "./components/AdminRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./pages/User/ProductDetails";

const UserLayout = lazy(() => import("./layouts/UserLayout"));
const Home = lazy(() => import("./pages/User/Home"));
const Products = lazy(() => import("./pages/User/Products"));
const Deals = lazy(() => import("./pages/User/Deals"));
const Support = lazy(() => import("./pages/User/Support"));
const Aboutus = lazy(() => import("./pages/User/Aboutus"));
const Profile = lazy(() => import("./pages/User/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Verify = lazy(() => import("./pages/VerifyResult"));
const SignUp = lazy(() => import("./pages/SignUp"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "/product", element: <Products /> },
          { path: "/product/:productId", element: <ProductDetails /> },
          {
            path: "/deals",
            element: <Deals />,
          },
          { path: "/support", element: <Support /> },
          { path: "/about-us", element: <Aboutus /> },
          { path: "/profile", element: <Profile /> },
          {
            path: "/signup",
            element: (
              <ProtectedRoute
                redirectTo="/"
                conditionCallback={(user) => user}
                msg="Already Login"
              >
                <SignUp />
              </ProtectedRoute>
            ),
          },
          {
            path: "/auth-success",
            element: <AuthSuccess />,
          },
          {
            path: "/login",
            element: (
              <ProtectedRoute
                redirectTo="/"
                conditionCallback={(user) => user}
                msg="Already logged in"
              >
                <Login />
              </ProtectedRoute>
            ),
          },

          {
            path: "/verify",
            element: (
              <ProtectedRoute
                redirectTo="/"
                conditionCallback={(user) => user?.isVerified}
                msg="Already Verified"
              >
                <VerifyStatus />
              </ProtectedRoute>
            ),
          },
          { path: "/verify/:token", element: <VerifyResult /> },
        ],
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),

        children: [{ index: true, element: <AdminDashboard /> }],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster position="top-center" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
