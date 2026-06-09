const express = require("express");
const Mood = require("../models/Mood");

const router = express.Router();

router.post("/add", async (req, res) => {

    try {

        const mood = await Mood.create(req.body);

        res.status(201).json({
            message: "Mood Saved Successfully",
            mood
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get("/:userId", async (req, res) => {

    try {

        const moods = await Mood.find({
            userId: req.params.userId
        });

        res.status(200).json(moods);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get("/analytics/:userId", async (req, res) => {

    try {

        const moods = await Mood.find({
            userId: req.params.userId
        });

        const stats = {};

        moods.forEach((item) => {

            stats[item.mood] =
                (stats[item.mood] || 0) + 1;

        });

        res.json(stats);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
module.exports = router;