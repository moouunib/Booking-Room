const mongoose= require("mongoose"); 


const personSchema = mongoose.Schema(
  {
    nin: {
      type: String,
      required: true,
      unique: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    dateBirth: Date,
    placeBirth: String,
  },
  { timestamps: true },
);



const personModel = mongoose.model("Persons",personSchema);

module.exports = personModel;