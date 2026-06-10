const express = require("express");
const User = require("../models/User");

const router = express.Router();
const Mood = require("../models/Mood");
const Recognition = require("../models/Recognition");
const axios = require("axios");

router.get("/dashboard/:id", async (req, res) => {

    try {

        const user =
        await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            name: user.name,
            email: user.email,
            department: user.department,
            points: user.points
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get(
"/engagement",
async (req,res)=>{

 try{

   const response = await axios.get(
  `${process.env.PYTHON_API_URL}/engagement-score`
);
   res.json(
   response.data
   );

 }catch(error){

   res.status(500).json({

      error:error.message

   });

 }

});
router.get("/department-stats", async (req, res) => {

    try {

        const users = await User.find();

        const stats = {

            IT: 0,
            HR: 0,
            Sales: 0,
            Marketing: 0

        };

        users.forEach((user) => {

            if (stats[user.department] !== undefined) {

                stats[user.department]++;

            }

        });

        res.json(stats);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});
router.get("/recommendation", async (req, res) => {

    try {

        const response = await axios.get(
            `${process.env.PYTHON_API_URL}/recommendation`
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get("/leaderboard", async (req, res) => {

    try {

        const users =
        await User.find()
        .sort({ points: -1 })
        .limit(10);

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get("/profile/:id", async (req, res) => {

    try {

        const user =
        await User.findById(
            req.params.id
        );

        res.json(user);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get("/", async (req, res) => {

    try {

        const users =
        await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get(
"/profile-stats/:id",
async (req,res)=>{

 try{

   const userId =
   req.params.id;

   const user =
   await User.findById(
   userId
   );

   const moods =
   await Mood.countDocuments({

      userId

   });

   const recognitions =
   await Recognition.countDocuments({

      toUser:userId

   });

   const leaderboard =
   await User.find()
   .sort({
      points:-1
   });

   const rank =
   leaderboard.findIndex(

      u =>
      u._id.toString() ===
      userId

   ) + 1;

   res.json({

      name:
      user.name,

      email:
      user.email,

      department:
      user.department,

      points:
      user.points,

      moods,

      recognitions,

      rank

   });

 }catch(error){

   res.status(500).json({

      error:
      error.message

   });

 }

});
router.get(
"/admin/stats",
async (req,res)=>{

 try{

   const employees =
   await User.countDocuments();

   const moods =
   await Mood.countDocuments();

   const recognitions =
   await Recognition.countDocuments();

   const topPerformer =
   await User.findOne()
   .sort({points:-1});

   res.json({

      employees,

      moods,

      recognitions,

      topPerformer

   });

 }catch(error){

   res.status(500).json({

      error:error.message

   });

 }

});
router.get("/all", async (req, res) => {

    try {

        const users =
        await User.find()
        .sort({ createdAt: -1 });

        res.json(users);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.delete("/:id", async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Employee Deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.put("/department/:id", async (req, res) => {

    try {

        const user =
        await User.findByIdAndUpdate(

            req.params.id,

            {
                department:
                req.body.department
            },

            {
                new: true
            }

        );

        res.json(user);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.put("/reset-points/:id", async (req, res) => {

    try {

        const user =
        await User.findByIdAndUpdate(

            req.params.id,

            {
                points: 0
            },

            {
                new: true
            }

        );

        res.json(user);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
module.exports = router;