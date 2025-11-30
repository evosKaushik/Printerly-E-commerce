import UserAPI from "@/api/User.api";
import LazyLoader from "@/components/ui/LazyLoader";
import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect } from "react";

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
