import BaseAPI from "@/api/Base.api";
import UserAPI from "@/api/Base.api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const VerifyResult = () => {
  const [status, setStatus] = useState({
    isVerified: false,
    status: "Verifying",
  });
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("pendingEmail")) {
      navigate("/");
    }
    const verifyToken = async () => {
      try {
        const { data } = await BaseAPI.post(
          "/user/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          setStatus({
            isVerified: true,
            status: "✅ Verify successfully",
          });
          toast.success("Verify successfully");
          localStorage.removeItem("pendingEmail");
          setTimeout(() => {
            navigate("/login");
            toast("Login to Proceed", {
              icon: "ℹ",
            });
          }, 1000);
        }
      } catch (error) {
        console.log(error.message);
        if (error.response.data.message === "Token expired") {
          setStatus({
            isVerified: false,
            status: "❌ Token expire try again",
          });
          toast.error("Token expire try again");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          return;
        }
        if (error.response.data.message === "Unauthorized") {
          setStatus({
            isVerified: false,
            status: "❌ not a valid Token",
          });
          toast.error("not a valid Token");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          return;
        }
        if (error.response.data.message === "User is already verified") {
          setStatus({
            isVerified: false,
            status: "❌ Verification failed, Already verified",
          });
          toast.error("Already verified");
          return;
        }
        if (!error.response.data.success) {
          setStatus({
            isVerified: false,
            status: "❌ Verification failed",
          });
          toast.error("Verification failed");
          return;
        }
      }
    };
    verifyToken();
  }, []);

  return (
    <div className="bg-(--bg-primary-clr) h-[calc(100vh-72px)]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-inter flex gap-1 justify-center items-center">
          {status.status === "Verifying" && (
            <Loader2 className="animate-spin" />
          )}
          {status.status}
        </h1>
        {status.isVerified && (
          <p className="text-center mt-4 text-lg font-inter">
            Redirecting To Home Page
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyResult;
