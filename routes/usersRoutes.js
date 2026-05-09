const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Person = require("../models/person");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const {
      nin,
      lName,
      fName,
      dateBirth,
      placeBirth,
      userName,
      password,
      status,
      role,
    } = req.body;

    if (!password || !userName || !nin || !role) {
      return res.status(400).json({
        message: "NIN, role,password and username are required",
      });
    }
    let person = await Person.findOne({ nin }).exec(); //if exist return 1
    if (!person) {
      person = await Person.create({
        nin,
        lName,
        fName,
        dateBirth,
        placeBirth,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findOne({ userName }).exec();
    if (user)
      return res.status(409).json({ message: "This user already exist " });

    user = await User.create({
      nin: person.nin,
      userName,
      password: hashedPassword,
      status,
      role,
    });
    const userResponse = user.toObject();
    delete userResponse.password;
    return res.status(201).json({
      message: "register successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error(error); // 👈 مهم
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

router.post("/login", async(req,res)=>{
    try {
        const { userName,  password } = req.body;
        if ( !userName  || !password) {
          return res
            .status(400)
            .json({ message: "Username, password and  are required" });
        }
        const foundUser = await User.findOne(
           { userName },).exec();
        if (!foundUser)
          return res.status(401).json({ message: "this user is not found" });
        
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(401).json({message : "this password is not correct"});
        const token = jwt.sign(
          {
            id: foundUser._id,
            role: foundUser.role,
            status:foundUser.status,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        const user = foundUser.toObject();
        delete user.password;
        return res
          .status(200)
          .json({ message: "login is successfully", user,token });
    } catch (error) {
        console.error(error); // 👈 مهم
        res.status(500).json({
          message: "Server error",
          error: error.message,
        });
    }
    
} )





module.exports = router;
