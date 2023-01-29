// Require Mongoose
const mongoose = require("mongoose");

// Create Card Schema

const cardSchema = new mongoose.Schema({
name: {type: String, required: true},
boxSet: {type: String, required: true},
condition: {type: String, required: true},
cardDescription: {type: String, required: true},
img:{type: String},
rarity: {type: String},
cardType: {type: String},
price: {type: Number},
attack: {type: Number},
defense: {type: Number}
}, {timestamps: true});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;