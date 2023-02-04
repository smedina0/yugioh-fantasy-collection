// Require Mongoose
const mongoose = require("mongoose");

// Create Card Schema

const cardSchema = new mongoose.Schema({
name: {type: String, required: true},
boxSet: {type: String},
condition: {type: String},
cardDescription: {type: String},
img:{type: String},
src:{type: String, default: "https://res.cloudinary.com/dajbkbomv/image/upload/v1675488687/Back-ZX-Site_npoboq.webp"
},
rarity: {type: String},
cardType: {type: String},
price: {type: Number},
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

// read json - for each - create card

// Read JSON fs readfile

//pas it the file

// read file - callback - assign a variable that will be data from file

// .data on that to get into the array

// for each item in data array - create card

// card.create object with keys that reflect data

//values will be data

// make a new route called seed json - use as sandbox

// console.log the array

// pagination - node js module

// https://www.npmjs.com/package/pagination