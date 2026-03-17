const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const {nin , lName , fName , dateBirth , placeBirth ,userName
        ,email , password , status , role 
     }= req.body;
    
    if (!email || !password || !userName) {
      return res
        .status(400)
        .json({ message: "Email, password and username are required" });
    } 
    const foundUser = await User.findOne({ $or:[{email},{userName}] }).exec(); //if exist return 1 
      if (foundUser) {
        return res.status(409).json({ message: "user already exist" });
      }
      const hashedPassword= await bcrypt.hash(password,10);
      const user = await User.create({
        nin,
        lName,
        fName,
        dateBirth,
        placeBirth,
        userName,
        email,
        password:hashedPassword,
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
    res.status(500).json({message:"error in server"});
  }
});

router.post("/login", async(req,res)=>{
    try {
        const { userName, email, password } = req.body;
        if ((!userName && !email) || !password) {
          return res
            .status(400)
            .json({ message: "Email, password and username are required" });
        }
        const foundUser = await User.findOne({
          $or: [{ email }, { userName }],
        }).exec();
        if (!foundUser)
          return res.status(401).json({ message: "this user is not found" });
        
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(401).json({message : "this password is not correct"});
        const token = jwt.sign(
          {
            id: foundUser._id,
            role: foundUser.role,
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
        return res.status(500).json({message:"error in the server",
          
        })
    }
    
} )




module.exports = router;
