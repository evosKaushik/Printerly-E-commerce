import SignupForm from "@/components/SignupForm";
import React from "react";

const SignUp = () => {
  return (
    <section className="w-full  flex justify-center  items-center min-h-[calc(100vh-72px)] bg-(--bg-primary-clr)">
      <SignupForm />
    </section>
  );
};

export default SignUp;
