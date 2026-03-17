const express = require("express");
const router = express.Router();
const Client = require("../models/client");

router.post("/register", async (req, res) => {
  try {
    const { nin, fName, lName, email, phone, dateBirth, placeBirth } = req.body;
    if (!nin || !fName || !lName || !email )
      return res
        .status(400)
        .json({
          message: "Nin , first and last name and date of birth are required",
        });
    const client = await Client.create({
      nin,
      fName,
      lName,
      email,
      phone,
      dateBirth,
      placeBirth,
    });
    const clientResponse = client.toObject();

    return res.status(201).json({
      message: "register successfully",
      client: clientResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "error in server" });
  }
});
router.get("/allClients" , async(req , res)=>{
    try {
        const clients = await Client.find({});
        res.send(clients);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
} )

module.exports = router;
