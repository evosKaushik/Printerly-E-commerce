import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const SignupForm = () => {
  const [seePassword, setSeePassword] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormData = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/user/register`,formData,
        {
          headers: "application/json",
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    submitFormData()
  };

  return (
    <Card className="w-11/12 max-w-md font-inter">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">New Here</CardTitle>
        <CardDescription>
          Join to find great deals on quality printers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 2xl:gap-6">
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={handleInput}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="singh"
                required
                value={formData.lastName}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="John_123"
              required
              value={formData.username}
              onChange={handleInput}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="xyz@example.com"
              required
              value={formData.email}
              onChange={handleInput}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center flex-wrap">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={!seePassword ? "text" : "password"}
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleInput}
              />
              {seePassword ? (
                <Eye
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setSeePassword(!seePassword)}
                />
              ) : (
                <EyeOff
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setSeePassword(!seePassword)}
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full cursor-pointer text-white font-semibold text-[16px]"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Sign in with Google
        </Button>
        <p className="text-[16px] -mb-3 2xl:my-2">
          Already have a account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
