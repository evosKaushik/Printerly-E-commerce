import React, { useState } from "react";
import {
  Card,
  CardAction,
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

const LoginForm = () => {
  const [seePassword, setSeePassword] = useState(true);
  return (
    <Card className="w-11/12 max-w-md font-inter">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">New Here</CardTitle>
        <CardDescription>
          Join to find great deals on quality printers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" placeholder="singh" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="xyz@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center flex-wrap">
              <Label htmlFor="password">Password</Label>
              <Link
                to="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={!seePassword ? "text" : "password"}
                placeholder="Create a password"
                required
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
        >
          Login
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Sign in with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
