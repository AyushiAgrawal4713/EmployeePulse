const express = require("express");

const Recognition = require("../models/Recognition");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const {
            fromUser,
            toUser,
            message
        } = req.body;

        const recognition =
        await Recognition.create({

            fromUser,
            toUser,
            message

        });

        await User.findByIdAndUpdate(
            toUser,
            {
                $inc: {
                    points: 10
                }
            }
        );

        res.status(201).json({

            message: "Recognition Sent Successfully",

            recognition

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});
router.get("/:userId", async (req, res) => {

    try {

        const recognitions =
        await Recognition.find({

            toUser:
            req.params.userId

        })
        .populate(
            "fromUser",
            "name"
        )
        .sort({
            createdAt: -1
        });

        res.json(
            recognitions
        );

    } catch (error) {

        res.status(500).json({

            error:
            error.message

        });

    }

});
module.exports = router;