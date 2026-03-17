const express = require("express");

const router = express.Router();
const Client = require("../models/client");
const Room = require("../models/room");
const Reservation = require("../models/reservation");


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
        if (!nin || !fName || !lName || !email)
          return res.status(400).json({
            message: "Nin , first and last name and date of birth are required",
          });
        let client = await Client.findOne({nin}).exec();
        if(!client){
            client = await Client.create({
              nin,
              fName,
              lName,
              email,
              phone,
              dateBirth,
              placeBirth,
            });
        }
        
        const clientResponse = client.toObject();
        
        if(!client) return res.status(404).json({message:"this client is not found"});
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate-checkInDate)/(1000*60*60*24));
        if(nights<= 0)return res.status(400).json({message:'invalid booking dates'});        
        const totalPrice = 8000*nights;

        const newReservation = await Reservation.create({
          clientId: clientResponse._id,
          client: {
            fName: clientResponse.fName,
            lName: clientResponse.lName,
            email: clientResponse.email,
          },
        roomId: room._id,
        roomNumber:room.roomNumber,
          checkIn,
          checkOut,
          totalPrice,
          nights,
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
          data: newReservation,
          nights:nights,
        });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
} );

router.get("/getAllReservation", async(req , res )=>{
    try {
        const reservation = await Reservation.find({});
        if(!reservation) return res.status(404).json({ message: "Reservation is not found" });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


module.exports=router;