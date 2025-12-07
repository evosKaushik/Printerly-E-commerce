import BaseAPI from "@/api/Base.api";
import Form from "@/components/Form";
import InputWithLabel from "@/components/ui/InputWithLabel";
import PasswordInput from "@/components/ui/PasswordInput";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAccessToken, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormData = async () => {
    await toast.promise(
      BaseAPI.post("/user/login", formData).then((res) => {
        const { data } = res;
        if (data.success) {
          setAccessToken(data.accessToken);
          setUser(data.user);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));

          const target = data.message.includes("Admin") ? "/admin" : "/profile";
          setTimeout(() => {
            navigate(target, { replace: true, state: { fromLogin: true } });
          }, 100);
        }

        return data;
      }),
      {
        loading: "Logging in...",
        success: (data) => data.message || "Login successful 🎉",
        error: (err) =>
          err.response?.data?.message || "Login failed. Please try again.",
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFormData();
  };

  return (
    <section className="w-full flex justify-center items-center min-h-[calc(100vh-72px)] bg-(--bg-primary-clr)">
      <Form
        formTitle="Welcome Back"
        formDescription="Login to your account"
        onSubmit={handleSubmit}
        submitText="Login"
        secondaryAction={{
          text: `Login with Google`,
          onClick: () =>
            window.open("http://localhost:3000/api/v1/auth/google", "_self"),
        }}
        footerText="Don't have an account?"
        footerLink={{ text: "Create", to: "/signup" }}
      >
        <InputWithLabel
          labelText="Email or Username"
          id="emailOrUsername"
          name="emailOrUsername"
          type="text"
          placeholder="Enter email or username"
          required
          value={formData.emailOrUsername}
          onChange={handleChange}
        />

        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          showStrengthMeter={false}
          labelText="Password"
          placeholder="Enter your password"
          showForgetLink={true}
          forgetPasswordUrl="/forgot-password"
        />
      </Form>
    </section>
  );
};

export default Login;
