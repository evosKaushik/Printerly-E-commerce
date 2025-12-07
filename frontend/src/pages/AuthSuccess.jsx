import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser, setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("token");
      setAccessToken(accessToken);

      if (accessToken) {
        try {
          const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.data.success) {
            toast.success(res.data.success);
            setUser(res.data.user);
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
