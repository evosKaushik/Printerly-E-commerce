import bcrypt from "bcrypt";
import UserModel from "../models/User.model.js";
import sanitize from "mongo-sanitize";
import crypto from "crypto";
import { verifyEmail } from "../emailVerification/verifyEmail.js";
import jwt from "jsonwebtoken";
import { Session } from "../models/Session.model.js";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,64}$/;

const register = async (req, res) => {
  try {
    //  Sanitize body
    const { firstName, lastName, username, email, password } = sanitize(
      req.body
    );

    // Checking all the required fields
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // firstName and lastName condition
    if (firstName.length < 3 || lastName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Enter valid first name or last name",
      });
    }

    // Email checking using Regex
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid E-mail",
      });
    }

    // ✅ Password validation using Regex
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.",
      });
    }

    // Username condition
    if (username.length < 4 || username.length > 16) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 4 and 16 characters.",
      });
    }

    if (username.includes(" ")) {
      return res.status(400).json({
        success: false,
        message: "Spaces are not allowed in username.",
      });
    }
    if (username.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "@ not include in username.",
      });
    }

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //  Check if username already exists
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user
    const newUser = await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    //Send Email Fn
    const verificationLink = `${process.env.CLIENT_URL}/verify/${token}`;
    console.log(verificationLink);
    // verifyEmail(verificationLink, email);
    newUser.token = token;

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Verification link send successfully",
      pendingEmail: newUser.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    user.token = null;
    user.isVerified = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Server Error ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = sanitize(req.body); //  Sanitize login data
    const { emailOrUsername, password } = data;

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    let user;
    if (emailRegex.test(emailOrUsername)) {
      const email = emailOrUsername;
      user = await UserModel.findOne({ email });
    } else {
      const username = emailOrUsername;
      user = await UserModel.findOne({ username });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "You are not a verified user",
      });
    }

    //  Compare passwords
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    await Session.deleteMany({ userId: user._id });

    await Session.create({
      userId: user._id,
      refreshToken,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    user.isLoggedIn = true;
    await user.save();

    // 🚫 Remove sensitive data before sending
    const { password: pwd, __v, ...safeUser } = user._doc;

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.firstName}!`,
      user: safeUser,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

const profile = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const user = await UserModel.findById(userId).select(
      "-password -__v -createdAt -updatedAt -token -isVerified -isLoggedIn"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User get successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await Session.deleteMany({ userId: userId });
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.isLoggedIn) {
      return res.status(404).json({
        success: false,
        message: "User already logout",
      });
    }
    await UserModel.findByIdAndUpdate(userId, { isLoggedIn: false });
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "User logged our successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error ${error.message}`,
    });
  }
};

const resendVerificationLink = async (req, res) => {
  try {
    const { email } = sanitize(req.body);

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid E-mail",
      });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    if (user.token) {
      let decoded;
      try {
        decoded = jwt.verify(user.token, process.env.SECRET_KEY);
        if (decoded) {
          return res.status(400).json({
            success: false,
            message: "Verification Link is Still valid",
          });
        }
      } catch (error) {
        if (!error.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token expired",
          });
        }
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    //Send Email Fn
    const verificationLink = `${process.env.CLIENT_URL}/verify/${token}`;
    console.log(verificationLink);
    // verifyEmail(verificationLink, email);
    user.token = token;

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Verification link send successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `Server Error ${error.message}`,
    });
  }
};

export { register, verify, login, profile, logout, resendVerificationLink };
