import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import "./styles/App.css";
import LazyLoader from "./components/ui/LazyLoader";
import NProgress from "./utils/progressBar";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 10); // short delay for smooth animation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Suspense fallback={<LazyLoader />}>
      <Outlet />
    </Suspense>
  );
};

export default App;
