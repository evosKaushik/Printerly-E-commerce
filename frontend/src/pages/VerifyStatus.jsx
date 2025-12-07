import UserAPI from "@/api/Base.api";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const VerifyStatus = () => {
  const [hidden, setHidden] =
    useState(!localStorage.getItem("hiddenContent")) || useState(true);
  const pendingEmail = localStorage.getItem("pendingEmail");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!pendingEmail) {
      navigate("/");
    }
  }, []);

  const handleClick = async () => {
    try {
      const { data } = await UserAPI.post(
        "http://localhost:3000/api/v1/user/resendVerificationLink",
        { email: pendingEmail }
      );
      if (data.success) {
        toast.success(data.message);
        setHidden(true);
        localStorage.setItem("hiddenContent", true);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data.message);
      if (error.response?.data.message === "Verification Link is Still valid") {
        setHidden(false);
        localStorage.setItem("hiddenContent", false);
      }
    }
  };

  return (
    <div className="screenBgColor py-16">
      <div className="container mx-auto px-4">
        {hidden && (
          <>
            <h1 className="text-lg sm:text-2xl font-inter font-bold  text-center">
              ✅ Verification Link have Been Send successfully
            </h1>
            <p className=" mt-8 sm:text-lg text-center font-inter">
              If your Enter correct E-mail the Verification of the email have
              send to your Inbox{" "}
              <span className="text-2xl align-middle">✉</span>
            </p>
            <p className="text-center mt-1 sm:text-lg  font-inter">
              <span className="text-2xl align-middle">✉</span> {pendingEmail}
            </p>
          </>
        )}
        <div
          className={`mt-4 sm:mt-8 items-center flex gap-4 flex-col justify-center pt-8 ${hidden && "border-t"} border-t-gray-500 dark:border-t-gray-400`}
        >
          <h1 className="text-lg sm:text-2xl font-inter font-bold  text-center">
            ❌ Failed to Verify Email ?
          </h1>
          <Button
            onClick={handleClick}
            variant="primary"
            className="text-lg p-6 font-bold dark:text-zinc-900 "
          >
            Click to Resend the Verification Link{" "}
            <MailIcon className="text-2xl" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyStatus;
