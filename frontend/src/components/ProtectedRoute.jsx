import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  redirectTo,
  msg,
  conditionCallback,
  children,
}) {
  const { user } = useContext(AuthContext);

  if (conditionCallback(user)) {
    toast.error(msg);
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}
