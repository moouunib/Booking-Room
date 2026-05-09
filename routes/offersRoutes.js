const express = require("express");
const router = express.Router();
const Offer = require("../models/offer");
const RoomType = require("../models/typeRoom");
const Rooms = require("../models/room");





router.post("/createOffer", async (req, res) => {
  try {
    const { offerName, nightlyPrice, startDate, endDate, typeName } = req.body;

    if (!offerName || !nightlyPrice || !startDate || !endDate || !typeName)
      return res.status(400).json({ message: "all field are required " });

    if (nightlyPrice <= 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    if (new Date(endDate) <= new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date must be after start date" });
    }

    const roomType = await RoomType.findOne({ name: typeName }).exec();
    if (!roomType)
      return res.status(404).json({ message: "not room type found" });

    let offer = await Offer.findOne({ offerName }).exec();
    if (offer)
      return res.status(409).json({ message: "This offer already exists" });

    // ✅ إنشاء العرض
    offer = await Offer.create({
      offerName,
      nightlyPrice,
      startDate,
      endDate,
      roomTypeId: roomType._id,
      typeName: roomType.name,
    });

    // 🔥 UPDATE ALL ROOMS OF THIS TYPE
    const Room = require("../models/room");

    await Room.updateMany(
      { "typeRoom.typeId": roomType._id },
      {
        $set: {
          "typeRoom.nightPrice": nightlyPrice,
        },
      },
    );

    return res.status(201).json({
      message: "offer created successfully and rooms updated",
      offer,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put("/updateOffer/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        const { offerName, nightlyPrice, startDate, endDate, typeName }=req.body;
        if (nightlyPrice <= 0) {
          return res.status(400).json({ message: "Price must be positive" });
        }

        if (new Date(endDate) <= new Date(startDate)) {
          return res
            .status(400)
            .json({ message: "End date must be after start date" });
        }


        const roomType = await RoomType.findOne({name:typeName}).exec();
        if(!roomType) return res.status(404).json({ message: "This room type is not found" });


        let offer = await Offer.findById(id);
        if(!offer) return res.status(404).json({message:"This offer is not found"});
        offer.offerName = offerName;
        offer.nightlyPrice = nightlyPrice;
        offer.startDate = startDate;
        offer.endDate = endDate;
        offer.roomTypeId = roomType._id;
        offer.typeName = roomType.name;

        await offer.save();

        return res.status(200).json({
          message: "The update of of offer is successfully",
          offer,
        });
    } catch (error) {
        return res.status(500).json({
          message: "server error",
          error: error.message,
        });
    }
});
router.delete("/deleteOffer/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        message: "Offer not found",
      });
    }

    await Offer.findByIdAndDelete(id);

    res.status(200).json({
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
router.get("/getAllOffers", async (req , res) =>{
    try {
     const offers = await Offer.find({});
     if (offers.length === 0)
       return res.status(404).json({ message: "Sorry Not Offer Found" });
    return res.status(200).json({ offers });    
    } catch (error) {
        return res.status(500).json({
          message: "server error",
          error: error.message,
        });
    }
    
} )


module.exports = router;