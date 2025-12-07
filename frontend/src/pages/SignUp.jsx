import BaseAPI from "@/api/Base.api";
import UserAPI from "@/api/Base.api";
import Form from "@/components/Form";
import InputWithLabel from "@/components/ui/InputWithLabel";
import PasswordInput from "@/components/ui/PasswordInput";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormData = async () => {
    await toast.promise(
      BaseAPI.post("/user/register", formData).then((res) => {
        const { data } = res;
        if (data.success) {
          localStorage.setItem("pendingEmail", data.pendingEmail);

          setTimeout(() => {
            navigate("/verify");
          }, 1000);
        }
        return data;
      }),

      {
        loading: "Logging in...",
        success: (data) => data.message || "Verification Link successful 🎉",
        error: (err) =>
          err.response?.data?.message ||
          "Failed to send verification Link . Please try again.",
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitFormData();
  };
  return (
    <section className="w-full  flex justify-center py-4  items-center min-h-[calc(100vh-72px)] bg-(--bg-primary-clr)">
      <Form
        formTitle="New Here"
        formDescription="Join to find great deals on quality printers."
        onSubmit={handleSubmit}
        submitText="Sign up"
        secondaryAction={{
          text: "Sign up with Google",
          onClick: () => window.open("http://localhost:3000/api/v1/auth/google", "_self"),
        }}
        footerText="Already have an account?"
        footerLink={{ text: "Login", to: "/login" }}
      >
        <div className="grid xs:grid-cols-2 gap-4">
          <InputWithLabel
            labelText="First Name"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputWithLabel
            labelText="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Dhon"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <InputWithLabel
          labelText="Username"
          id="username"
          name="username"
          type="text"
          placeholder="John_123"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <InputWithLabel
          labelText="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          labelText="Password"
          placeholder="Create your password"
          showForgetLink={false}
        />
      </Form>
    </section>
  );
};

export default SignUp;
