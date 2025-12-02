import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,64}$/;


const checkStrength = (password) => {
  if (!password) return { level: "", color: "bg-gray-300", gradient: "from-gray-300 to-gray-400", percent: 0 };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^\w\s]/.test(password)) score++;

  switch (score) {
    case 1:
      return { level: "Very Weak", color: "bg-red-500", gradient: "from-red-500 to-red-700", percent: 20 };
    case 2:
      return { level: "Weak", color: "bg-orange-500", gradient: "from-orange-400 to-orange-600", percent: 40 };
    case 3:
      return { level: "Moderate", color: "bg-yellow-500", gradient: "from-yellow-400 to-yellow-600", percent: 60 };
    case 4:
      return { level: "Strong", color: "bg-blue-500", gradient: "from-blue-400 to-blue-600", percent: 80 };
    case 5:
      return { level: "Very Strong", color: "bg-green-500", gradient: "from-green-400 to-green-600", percent: 100 };
    default:
      return { level: "", color: "bg-gray-300", gradient: "from-gray-300 to-gray-400", percent: 0 };
  }
};

const PasswordInput = ({
  labelText = "Password",
  id = "password",
  name = "password",
  placeholder = "Enter your password",
  required = true,
  value,
  onChange,
  showForgetLink = false,
  forgetPasswordUrl = "/forgot-password",
  showStrengthMeter = true,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = checkStrength(value);

  return (
    <div className={`grid gap-2 ${className}`}>
      {/* Label + optional link */}
      <div className="flex items-center flex-wrap">
        <Label htmlFor={id}>{labelText}</Label>
        {showForgetLink && (
          <Link
            to={forgetPasswordUrl}
            className="ml-auto inline-block text-sm text-blue-800 font-medium dark:text-(--secondary-clr) hover:underline underline-offset-4"
          >
            Forgot your password?
          </Link>
        )}
      </div>

      {/* Input + eye toggle */}
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="pr-8"
        />

        {showPassword ? (
          <EyeOff
            size={20}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 transition-colors"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            size={20}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 transition-colors"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>

      {/* Strength Meter */}
      {showStrengthMeter && value && (
        <div className="space-y-1 mt-1">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${strength.gradient} transition-all duration-700 ease-in-out`}
              style={{ width: `${strength.percent}%` }}
            ></div>
          </div>
          <p
            className={`text-xs font-semibold transition-colors duration-500 ${
              strength.level.includes("Weak")
                ? "text-red-500"
                : strength.level === "Moderate"
                ? "text-yellow-600"
                : strength.level.includes("Strong")
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {strength.level || " "}
          </p>

          {!PASSWORD_REGEX.test(value) && (
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Must include: 1 uppercase, 1 lowercase, 1 number, 1 symbol, no spaces, min 8 characters.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
