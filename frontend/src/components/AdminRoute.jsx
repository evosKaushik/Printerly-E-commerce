import { useContext, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import LazyLoader from "./ui/LazyLoader";

export default function AdminRoute({
  redirectTo = "/",
  msg = "Access denied! Admins only 🚫",
  children,
}) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const hasShownToast = useRef(false);
  const isAdmin = user && user.role?.toLowerCase() === "admin";

  useEffect(() => {
    if (!loading && !isAdmin && !hasShownToast.current) {
      toast.error(msg);
      hasShownToast.current = true;
    }
  }, [loading, isAdmin, msg]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LazyLoader />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
}
