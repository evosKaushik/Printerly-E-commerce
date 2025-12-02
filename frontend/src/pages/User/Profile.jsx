import UserAPI from "@/api/User.api";
import Form from "@/components/Form";
import InputWithLabel from "@/components/ui/InputWithLabel";
import PasswordInput from "@/components/ui/PasswordInput";
import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await UserAPI.get(
          "http://localhost:3000/api/v1/user/profile",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
        if (error.response.data?.message) {
          toast.error(error.response.data?.message);
        }
      }
    };

    getUserProfile();
  }, []);

  return (
    <div>
      Profile

    </div>
  );
};

export default Profile;
