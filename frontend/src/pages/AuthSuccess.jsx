import BaseAPI from "@/api/Base.api";
import { setUser } from "@/redux/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("token");
      localStorage.setItem("accessToken", accessToken);

      if (accessToken) {
        try {
          const res = await BaseAPI.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.data.success) {
            toast.success(res.data.success);
            dispatch(setUser(res.data.user))
            navigate("/");
          }
        } catch (error) {
          console.log("Error fetching user:", error);
        }
      }
    };
    handleAuth();
  }, [navigate]);
  return (
    <div className="screenBgColor">
      <h1>Logging in...</h1>
    </div>
  );
};

export default AuthSuccess;
