const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const user = require("../models/schema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

userRouter.post(
    "/register",
    [
        body("email").isEmail().withMessage("invalid Email"),
        body("password").isLength({ min: 8 }).withMessage("password must have more than 8 characters"),
        body("password").isStrongPassword().withMessage("not a strong password"),
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
            res.send(result);
        } catch (err) {
            res.send("registration failed");
            console.log(err);
        }
    }
);
userRouter.post("/login", async (req, res) => {
    try{
        const {email,password} = req.body;

        const foundUser = await user.findOne({email});
        if(!foundUser){
            return res.send("email not found")
        }

        const isMatch = await bcrypt.compare(password,foundUser.password);
        if(!isMatch){
            return res.send("invalid password");
        }

        res.send("Login successful")
    }
    catch(err){
        console.log(err);
        res.send("login failed");
    }
});

module.exports = userRouter;
