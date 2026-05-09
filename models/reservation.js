const mongoose = require("mongoose");


const reservationSchema = mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    client: {
      nin:{
        type :String,
        required:true,
      },
      fName: {
        type: String,
        required: true,
      },
      lName: {
        type: String,
        required: true,
      },
      email: String,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    roomNumber:String,

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "offers",
    },
    offer: {
      offerName: String,
      dateBegin: {
        type: Date,
      },
      dateEnd: {
        type: Date,
      },
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalPrice:{type:Number, required:true},
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);
const reservationModel = mongoose.model("reservations", reservationSchema);
module.exports = reservationModel;