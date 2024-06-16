const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const user = require("../models/schema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/jwt")

userRouter.post(
    "/register",
    [
        body("email").isEmail().withMessage("invalid Email"),
        body("password").isLength({ min: 8 }).withMessage("password must have more than 8 characters"),
        // body("password").isStrongPassword().withMessage("not a strong password"),
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        let hash = await bcrypt.hash(req.body.password, 10);
        try {
            const result = await user.create({
                email: req.body.email,
                password: hash,
            });
            return res.status(200).json({message:"Registration Successful"});
        } catch (err) {
           return res.status(400).json({message:"Registration Failed"});
            console.log(err);
        }
    }
);
userRouter.post("/login", async (req, res) => {
    try{
        const {email,password} = req.body;

        const foundUser = await user.findOne({email});
        if(!foundUser){
            return res.status(404).json({message:"Invalid Email"})
        }

        const isMatch = await bcrypt.compare(password,foundUser.password);
        if(!isMatch){
            return res.status(404).json({message:"Wrong Password"})
        }

        const token = generateToken(foundUser);
        res.status(200).json({message : "Login Successful" , token})
    }
    catch(err){
        console.log(err);
        res.status(404).json({message:"Login Failed"})
    }
});

module.exports = userRouter;
