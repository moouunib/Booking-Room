const express = require("express");
const router = express.Router();
const Client = require("../models/client");

router.get("/allClients", async (req, res) => {
  try {
    const clients = await Client.find({});
    res.send(clients);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
