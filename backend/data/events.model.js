const mongoose = require("mongoose");
const UserModel = require("./users.model")

const EventSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            required: true
        },
        organizerId: {
            type: String,
            required: false,
        },
        pendingInvitations: [],
        declinedInvitations: [],
        participants: []
    },
    {
        timestamps: true
    }
);

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;