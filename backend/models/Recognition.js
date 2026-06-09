const mongoose = require("mongoose");

const recognitionSchema = new mongoose.Schema({

    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Recognition",
    recognitionSchema
);