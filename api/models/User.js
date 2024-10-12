import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  genderPreference: {
    type: String,
    enum: ["male", "female", "both"],
  },
  bio: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  ],
  matches:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  ]
});
