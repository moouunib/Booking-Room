const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nin: {
      type: String,
      required: true,
      unique: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    dateBirth: {
      type: Date,
      required: true,
    },
    placeBirth: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["operation_staff", "offers_manger", "manager"],
      default: "operation_staff",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: ["active"],
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("users",userSchema);
module.exports= userModel;