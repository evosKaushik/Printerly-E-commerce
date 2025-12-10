import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ProtectedRoute({
  redirectTo = "/login",
  msg = "Please login to continue",
  conditionCallback = (user) => !user,
  children,
}) {
  const { user } = useSelector((store) => store.user);

  const location = useLocation();
  const shouldRedirect = conditionCallback(user);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (shouldRedirect && !hasShownToast.current) {
      const cameFromLogin =
        location.state?.fromLogin === true || location.pathname === "/login";

      if (!cameFromLogin && msg) toast.error(msg);
      hasShownToast.current = true;
    }
  }, [shouldRedirect, msg, location]);

  if (shouldRedirect) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
}
