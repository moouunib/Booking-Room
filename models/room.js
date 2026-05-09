const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: false,
  },
  status: {
    type: String,
    enum: ["available", "reserve", "maintenance"],
    default: "available",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
});



const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: String,
    },

    typeRoom: {
      typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeRooms",
      },
      name: String,
      capacity: String,
      nightPrice :Number,
      description: {
        type: String,
      },
    },
    currentBookings: [bookingSchema],

    imageUrl: [],
  },
  { timestamps: true },
);

const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;