import { Outlet } from "react-router-dom";
import "./styles/App.css";
import { Suspense } from "react";
import LazyLoader from "./components/ui/LazyLoader";

const App = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
