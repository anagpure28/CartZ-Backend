const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config()

const userRouter = express.Router();

// Register
userRouter.post("/register", async(req,res)=> {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await UserModel.find({email});
        if(existingUser.length){
            return res.status(400).send({
                error: "User already exists"
            })
        }else{
            bcrypt.hash(password, 10, async(err, hash)=>{
                const user = new UserModel({ firstName, lastName, email, password: hash});
                await user.save();
                res.status(200).json({msg: "Registered Successfully!!",user: req.body})
            });
        }
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// Login
userRouter.post("/login",async(req,res)=> {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});  
        if(user){
            const userName = user.firstName;
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    let token = jwt.sign({userID: user._id, username: user.firstName}, process.env.secretKey)
                    res.status(200).json({msg: "Login Successful!!", token, userName })
                }else{
                    res.status(200).json({msg: "Wrong Credentails!!"})
                }
            });
        }else{
            res.status(400).json({msg: "User does not exist!!"})
        }
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

// Logout
// userRouter.get("/logout",(req,res)=>{
//     const token = req.headers.authorization?.split(" ")[1]
//     try {
//        BlacklistModel.push(token);
//        res.status(200).json({msg: "User has been logged out"}) 
//     } catch (error) {
//         res.status(200).json({error: error.message}) 
//     }
// })

userRouter.get('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(400).json({ error: 'Token not provided in the request header' });
    }
  
    try {
      // Create a new document in the BlacklistModel collection with the token
      await BlacklistModel.create({ blacklist: [token] });
      res.status(200).json({ msg: 'User has been logged out' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = {
    userRouter
}