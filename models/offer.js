const mongoose = require("mongoose");


const offerSchema = mongoose.Schema(
  {
    offerName: {
      type: String,
      required: true,
      unique: true,
    },
    nightlyPrice: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    roomTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "typeRooms",
      required: true,
    },
    typeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const offerModel = mongoose.model("offers",offerSchema);

module.exports = offerModel;