const mongoose = require("mongoose");


const roomSchema = mongoose.Schema({
    status:{
        type:String,
        enum :["libre" , "reserve" , "maintenance"],
        default:"libre",
        required:true
    },
    description:{
        type:String,
    },
    imageUrl:[],
    currentBookings:[],

},{timestamps:true});

const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;