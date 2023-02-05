// Require Mongoose
const mongoose = require("mongoose");

// Create Card Schema

const cardSchema = new mongoose.Schema({
name: {type: String, required: true},
boxSet: {type: String},
condition: {type: String},
cardDescription: {type: String},
img:{type: String},
src:{type: String},
rarity: {type: String},
cardType: {type: String},
price: {type: String},
attack: {type: Number},
defense: {type: Number},
race: {type: String},
archetype: {type: String},
rarity: {type: String},
attribute: {type: String},
level: {type: String},


}, {timestamps: true});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;

