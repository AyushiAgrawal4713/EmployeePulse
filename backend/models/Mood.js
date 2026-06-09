const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

   mood: {
    type: String,
    enum: [
        "Happy",
        "Excited",
        "Calm",
        "Neutral",
        "Sleepy",
        "Confused",
        "Frustrated",
        "Angry",
        "Sad",
        "Stressed",
        "Overwhelmed",
        "Motivated"
    ],
    required: true
},

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Mood", moodSchema);