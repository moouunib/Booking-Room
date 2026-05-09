const express = require("express");
const router = express.Router();
const TypeRoom = require("../models/typeRoom")


router.post("/createType", async(req,res)=>{
    try {
        let {name,capacity,description}=req.body;
        if(!name||!capacity)
            return res.status(400).json({
              message:
                "name and capacity are required",
            });
        name = name.trim().toLowerCase();
        const existing = await TypeRoom.findOne({ name }).exec();
        if(existing) return res.status(409).json({ message: "this type already exist " });
        const typeRoom = await TypeRoom.create({
          name,
          capacity,
          description,
        });
        return res.status(200).json({message:"Type room created successfully",
            typeRoom,
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
} );
router.get("/getAllRoomTypes",async (req , res ) =>{
    try {
        const types = await TypeRoom.find({});
        if(!types) return res.status(404).json({message:"not type found"})
        return res.status(200).json({types});
    } catch (error) {
                return res.status(500).json({ message: error.message });

    }
})


module.exports = router;