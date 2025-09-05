const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    // Optional fields for analytics
    age: { type: Number },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "male", "female"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
