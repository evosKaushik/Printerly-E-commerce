import { useContext, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import LazyLoader from "./ui/LazyLoader";
import { useSelector } from "react-redux";

export default function AdminRoute({
  redirectTo = "/",
  msg = "Access denied! Admins only 🚫",
  children,
}) {
 const { user } = useSelector((store) => store.user);
  const location = useLocation();
  const hasShownToast = useRef(false);
  const isAdmin = user && user.role?.toLowerCase() === "admin";

  useEffect(() => {
    if (!isAdmin && !hasShownToast.current) {
      toast.error(msg);
      hasShownToast.current = true;
    }
  }, [isAdmin, msg]);

  if (!user) {
    return <LazyLoader />;
  }

  if (!isAdmin) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
}
