import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BaseAPI from "@/api/Base.api";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import {
  CreditCard,
  LayoutDashboard,
  LocationEdit,
  Pencil,
  ReceiptText,
  Save,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import MobileNav from "@/section/Profile/MobileNav";
import SideBar from "@/components/SideBar";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [updatedProfileData, setUpdatedProfileData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    avatar: profileData.avatar,
  });

  const { accessToken, logout, setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const profileListItem = [
    { id: 1, title: "My Profile", icon: <UserRound size={22} /> },
    { id: 2, title: "My Addresses", icon: <LocationEdit size={22} /> },
    { id: 3, title: "Order History", icon: <ReceiptText size={22} /> },
    { id: 4, title: "Payment Methods", icon: <CreditCard size={22} /> },
    { id: 5, title: "My Cart", icon: <ShoppingCart size={22} /> },
  ];

  // Fetch Profile Data
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await BaseAPI.get("/user/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (data.success) {
          setProfileData(data.data);
          setUpdatedProfileData(data.data);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch profile");
      }
    };
    getUserProfile();
  }, [accessToken]);

  // Handle File Change
  const handleFileChange = (e) => {
    setIsEditing(true);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdatedProfileData((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(selectedFile),
    }));
  };

  // Handle Input Change
  const handleChange = (e) => {
    setUpdatedProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Edit / Save
  const handleEditToggle = async () => {
    // If not editing, enable edit mode
    if (!isEditing) return setIsEditing(true);

    // Prevent API call if nothing changed
    if (updatedProfileData === profileData) {
      setIsEditing(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("firstName", updatedProfileData.firstName);
      fd.append("lastName", updatedProfileData.lastName);
      fd.append("email", updatedProfileData.email);
      if (file) fd.append("file", file);


      await toast.promise(
        BaseAPI.put(`/user/update-profile/${profileData._id}`, fd, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }),

        {
          loading: "Updating your profile...",
          success: (res) => {
            const data = res.data;
            if (data.success) {
              setProfileData(data.updatedUser || updatedProfileData);
              setIsEditing(false);
              console.log(data.updatedUser)
            }
            return data.message || "Profile updated successfully!";
          },
          error: (err) => {
            console.error(err);
            return (
              err.response?.data?.message ||
              "Failed to update profile. Try again."
            );
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await BaseAPI.post(
        "user/logout",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setTimeout(() => logout(), 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <main className="screenBgColor min-h-[calc(100vh-72px)] font-inter">
      <div className="grid sm:grid-cols-[auto_1fr] relative">
        {/* Sidebar */}
        <SideBar
          navListItems={profileListItem}
          userDetails={profileData}
          onClickHandleLogout={handleLogout}
        />

        {/* Main Section */}
        <section className="pt-8 sm:px-4 md:px-8 xl:px-12">
          <div className="flex justify-between flex-wrap items-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">My Profile</h1>
            {profileData?.role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-blue-600 dark:text-blue-300"
              >
                <LayoutDashboard />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          <div className="bg-background/80 p-6 rounded-md border shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <Button
                onClick={handleEditToggle}
                variant="outline"
                className="border text-[16px] px-6 border-blue-500 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/50"
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 text-blue-900 dark:text-blue-100" />
                    Save
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 text-blue-900 dark:text-blue-100" />
                    Edit
                  </>
                )}
              </Button>
            </div>

            {/* Form */}
            <div className="space-y-6 grid">
              {/* Avatar */}
              <div className="flex gap-4 justify-center items-center lg:gap-8 flex-col md:flex-row">
                <div className="relative group shrink-0 w-24 h-24 rounded-full shadow-md ring-2 ring-blue-500/10 hover:ring-blue-500/40 transition-all duration-300">
                  {!updatedProfileData.avatar && (
                    <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  )}
                  <img
                    src={updatedProfileData.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full border bg-none"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 grow">
                  {/* First Name */}
                  <div className="border-b border-gray-400 dark:border-gray-600">
                    <label className="text-sm text-gray-500">First Name</label>

                    {loading ? (
                      <Skeleton className="w-full h-6 mt-3 mb-2" />
                    ) : (
                      <input
                        name="firstName"
                        type="text"
                        value={updatedProfileData?.firstName || <Skeleton />}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full text-base mt-1 p-2 border-b outline-none transition-all duration-200 ${
                          isEditing
                            ? "border-blue-500"
                            : "border-transparent bg-transparent cursor-default"
                        }`}
                      />
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="border-b border-gray-400 dark:border-gray-600">
                    <label className="text-sm text-gray-500">Last Name</label>
                    {loading ? (
                      <Skeleton className="w-full h-6 mt-3 mb-2" />
                    ) : (
                      <input
                        name="lastName"
                        type="text"
                        value={updatedProfileData?.lastName || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full text-base mt-1 p-2 border-b outline-none transition-all duration-200 ${
                          isEditing
                            ? "border-blue-500"
                            : "border-transparent bg-transparent cursor-default"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border-b border-gray-400 dark:border-gray-600">
                  <label className="text-sm text-gray-500">Email</label>

                  {loading ? (
                    <Skeleton className="w-full h-6 mt-3 mb-2" />
                  ) : (
                    <input
                      name="email"
                      type="email"
                      readOnly
                      value={profileData?.email || ""}
                      className={`w-full text-base mt-1 p-2  outline-none transition-all duration-200`}
                    />
                  )}
                </div>

                {/* Phone */}
                {/* <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    value={updatedProfileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full text-base mt-1 p-2 border-b outline-none transition-all duration-200 ${
                      isEditing
                        ? "border-blue-500"
                        : "border-transparent bg-transparent cursor-default"
                    }`}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Nav */}
      <MobileNav navListsItems={profileListItem} />
    </main>
  );
};

export default Profile;
