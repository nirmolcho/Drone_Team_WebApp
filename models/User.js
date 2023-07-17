user_controllers
const mongoose = require("mongoose");

const mongoose = require("mongoose"); 
 main
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, min: 6, max: 255},
        password: { type: String, required: true, max: 1024, min: 6, },
        role: { type: String, enum: ['admin', 'user'], required: true },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = { User } 