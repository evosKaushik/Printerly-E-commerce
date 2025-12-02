import UserAPI from "@/api/User.api";
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
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormData = async () => {
    await toast.promise(
      UserAPI.post("/login", formData).then((res) => {
        const { data } = res;
        if (data.success) {
          setTimeout(() => {
            navigate("/");
          }, 1000);
          setTimeout(() => {
            setAccessToken(data.accessToken);
            setUser(data.user);
            
          }, 1500);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitFormData();
  };
  return (
    <section className="w-full  flex justify-center  items-center min-h-[calc(100vh-72px)] bg-(--bg-primary-clr)">
      <Form
        formTitle="Welcome Back"
        formDescription="Login to your account"
        onSubmit={handleSubmit}
        submitText="Login"
        secondaryAction={{
          text: "Login with Google",
          onClick: () => console.log("Google login clicked"),
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
