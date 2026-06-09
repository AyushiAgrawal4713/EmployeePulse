const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            department
        } = req.body;

        const existingUser =
        await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword =
        await bcrypt.hash(password, 10);

        const user =
        await User.create({

            name,
            email,
            password: hashedPassword,
            department

        });

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find User

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        // Compare Password

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        // Generate JWT

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                department: user.department,

                points: user.points

            }

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});
module.exports = router;