const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/photo", express.static("photo"));




const db = require("./db");
const roomsRoutes = require("./routes/roomsRoutes");
app.use("/rooms", roomsRoutes);
app.use("/auth", require("./routes/usersRoutes"));
app.use("/client", require("./routes/clientsRoutes") );
app.use("/", require("./routes/reservationsRoutes"));


const port = process.env.PORT || 5000;
app.listen(port , ()=>console.log("server running in prot "+port));