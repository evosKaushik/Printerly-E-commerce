import BaseAPI from "@/api/Base.api";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await BaseAPI.get("/admin-dashboard/get-all-users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (data.success) {
          console.log(data.users[0]);
        }
      } catch (error) {
        console.log(error);
        navigate("/");
        toast.error(error.response?.data?.message);
      }
    };
    getAllUsers();
  }, [accessToken]);
  return <div>Admin Dashboard</div>;
};

export default AdminDashboard;
