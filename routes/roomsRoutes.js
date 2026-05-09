const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const TypeRoom = require("../models/typeRoom");


router.get(
    "/getAllRooms",async(req , res ) =>{
    try{
        const rooms = await Room.find({});
        if(!rooms)
            return res.status(404).json({message:"not room found"});

        return res.send(rooms);
    }catch(error){
        return res.status(400).json({message : error})
    }
});
//update type of room :
router.put("/updateRoomType/:id",async(req , res)=>{
    try {
      const roomId = req.params.id;
      
      const { typeId } = req.body;
      //find type by id
      const typeRoom = await TypeRoom.findById(typeId);
      if (!typeRoom)
        return res.status(404).json({ message: "this type is not found" });
      //find room
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ message: "room not found" });
      //update room :
      room.typeRoom = {
        typeId: typeRoom._id,
        name: typeRoom.name,
        capacity: typeRoom.capacity,
        description: typeRoom.description,
      };
      //save procedre
      await room.save();
      // response :
      return res.status(201).json({
        message: "the update of of type room is successfully",
        room,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
        error: error.message,
      });
    }
})
router.post("/updateStatus/:id", async (req,res) => {
    try {
        const roomId = req.params.id;
        const {status , checkIn , checkOut} = req.body;
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate-checkInDate)/(1000*60*60*24));
        if(nights<= 0) return res.status(400).json({message:'invalid booking dates'});

        const isOverLapping = room.currentBookings.some((booking)=>{
            return (
                new Date(checkIn) < booking.checkOut &&
                new Date(checkOut) > booking.checkIn
            );
        });
        if(isOverLapping) return res.status(400).json({
            message : `this room is reserved already in this date`
        });

        const reservationId = null;
        room.currentBookings.push({
            reservationId,
            status,
            checkIn,
            checkOut,
        });
        await room.save();

        res.json({
            message: "Room updated successfully",
            room
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});



module.exports=router;