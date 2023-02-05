// Require Mongoose
const mongoose = require("mongoose");

const userCards = new mongoose.Schema({

userId: {type: String},
cardId: {type: String}

}, {timestamps: true});

const UserCard = mongoose.model("UserCard", userCards);

module.exports = UserCard;