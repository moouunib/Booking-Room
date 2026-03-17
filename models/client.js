const mongoose = require("mongoose");


const clientSchema = mongoose.Schema(
  {
    nin: {
      type: String,
      unique: true,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      
    },
    dateBirth: {
      type: Date,
      
    },
    placeBirth: {
      type: String,
    },
  },
  { timestamps: true },
);


const clientModel = mongoose.model("clients",clientSchema);

module.exports = clientModel;