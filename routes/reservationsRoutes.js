const express = require("express");

const router = express.Router();
const Client = require("../models/client");
const Room = require("../models/room");
const Reservation = require("../models/reservation");
const Person = require("../models/person");
const verifyToken = require("../Middlewares/verifyToken");
const authorizeRoles = require("../Middlewares/authorizeRoles");

router.get(
  "/getAllReservation",
 
  async (req, res) => {
    try {
      const reservation = await Reservation.find({});
      if (reservation.length === 0)
        return res.status(404).json({ message: "Reservation is not found" });

      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);


router.post("/reservation", async (req , res)=> {
    try {
        const { nin, fName, lName, email,
             phone, dateBirth, placeBirth, roomId, checkIn, checkOut } = req.body ;
        const room = await Room.findById(roomId);

        if (!room)
          return res.status(404).json({ message: "this room is not found" });
        
        const isOverLapping = room.currentBookings.some((booking)=>{
            return (
                new Date(checkIn) < booking.checkOut &&
                new Date(checkOut) > booking.checkIn
            );
        });
        if(isOverLapping) return res.status(400).json({
            message : `this room is reserved  already in this date `});
        if (!nin || !fName || !lName || !email || !phone)
          return res.status(400).json({
            message: "Nin , first and last name and phone are required",
          });
        let person = await Person.findOne({ nin }).exec();
        if(!person){
            person = await Person.create({
              nin,
              fName,
              lName,
              dateBirth,
              placeBirth,
            });
        }
        let client = await Client.findOne({ email }).exec();
        if(!client){
          client = await Client.create({
            email,
            phone,
            nin: person.nin,
          });
        }

        const clientResponse = client.toObject();
        
        
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate-checkInDate)/(1000*60*60*24));
        if(nights<= 0)return res.status(400).json({message:'invalid booking dates'});        
        
        
        // حساب المبلغ الاجمالي
        const totalPrice = room.typeRoom.nightPrice * nights;


        const newReservation = await Reservation.create({
          clientId: clientResponse._id,
          client: {
            nin:person.nin,
            fName: person.fName,
            lName: person.lName,
            email: client.email,
          },
          roomId: room._id,
          roomNumber: room.roomNumber,
          checkIn,
          checkOut,
          nights,
          totalPrice,
          status: "pending",
        });
        room.currentBookings.push({
          reservationId: newReservation._id,
          status: "reserve",
          checkIn,
          checkOut,
        });
        await room.save();
        res.status(201).json({
          message: "The reservation is successfully",
          newReservation,
          nights: nights,
          totalPrice,
        });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
} );

router.delete("/deleteReservation/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // حذف الحجز
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // حذف booking من الغرفة
    await Room.updateOne(
      { "currentBookings.reservationId": id },
      {
        $pull: {
          currentBookings: { reservationId: id },
        },
      },
    );

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
});


router.put("/UpdateReservation/:id", async (req ,res)=>{
  try {
  const {id} = req.params;
  const {status} = req.body;


  
  if (!status)
    return res.status(404).json({ message: "please enter the new status " });

  const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(updatedReservation);

  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
});
  




module.exports=router;