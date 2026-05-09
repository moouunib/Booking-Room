const mongoose = require("mongoose");


const typeRoomSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    capacity:{
        type:Number,
        required:true,
    },
    description:String,
},{timestamps :true,});
const typeRoomModel = mongoose.model("typeRooms", typeRoomSchema);

module.exports = typeRoomModel;