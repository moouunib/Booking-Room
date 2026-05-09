const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nin: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["operation_staff", "offers_manger", "manager"],
      default: "operation_staff",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("users",userSchema);
module.exports= userModel;