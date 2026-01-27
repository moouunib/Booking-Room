const express = require("express");
require("dotenv").config();
const roomsRoutes = require("./routes/roomsRoutes");
const app = express();
const cors = require("cors");
app.use(cors());

app.use("/photo", express.static("photo"));

app.use("/rooms", roomsRoutes);


const db = require("./db");

const port = process.env.PORT || 5000;
 app.listen(port , ()=>console.log("server running in prot "+port));