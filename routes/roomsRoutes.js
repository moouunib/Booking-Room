const express = require("express");
const router = express.Router();
const room = require("../models/room");

router.get("/getAllRooms",async(req , res ) =>{
    try{
        const rooms = await room.find({});
         res.send(rooms);
    }catch(error){
        return res.status(400).json({message : error})
    }
})

module.exports=router;