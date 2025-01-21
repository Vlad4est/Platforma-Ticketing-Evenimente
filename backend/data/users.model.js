const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            match: [/\S+@\S+\.\S+/, 'Email is invalid']
        },
        isOrganizer: {
            type: Boolean,
            required: true
        },
        //add an array of events but only if the user is an organizer
        events: {
            type: [String],
            required: false
        }
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;