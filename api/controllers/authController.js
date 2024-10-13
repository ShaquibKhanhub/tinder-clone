import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  //jwt token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const setTokenAndCookie = (user, res) => {
  // Generate JWT token
  const token = generateToken(user._id);

  // Set the JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 1000, // 30 days
    httpOnly: true, // Helps prevent XSS attacks
    sameSite: "strict", // Helps prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, age, gender, genderPreference } = req.body;
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "You must be at least 18 years old to sign up",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });

    // Set token and cookie
    setTokenAndCookie(newUser, res);

    res.status(201).json({
      success: true,
      user: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("error in signup controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Set token and cookie
    setTokenAndCookie(user, res);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("error in login controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
