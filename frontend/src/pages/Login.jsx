import LoginForm from "@/components/LoginForm";
import React from "react";

const Login = () => {
  return (
    <section className="w-full  flex justify-center  items-center min-h-[calc(100vh-72px)] bg-(--bg-primary-clr)">
      <LoginForm />
    </section>
  );
};

export default Login;
