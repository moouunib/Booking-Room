const mongoose = require("mongoose");


const clientSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
      nin: {
        type: String,
        required: true,
        unique: true,
      },
  },
  { timestamps: true },
);


const clientModel = mongoose.model("clients",clientSchema);

module.exports = clientModel;