// * Set Dependencies

// Express
const express = require("express");

// Mongoose
const mongoose = require("mongoose");
const Card = require("./models/card.js");

// Models
const Book = require("./models/card.js");

// File System Module
const fs = require("fs");
let rawData = fs.readFileSync("./models/card_info.json");
const cardData = JSON.parse(rawData).data;
// console.log(cardData);



//* create for each here (create new route - reference)

// // Image Downloader
// const download = require("image-downloader");
// for(let index in cardData) {
//     const card = cardData[index];
// }

// function Download(card){
//     if (typeof card.card_images[0].image_url != 'undefined') {
//     const name = card.id;

// const url = card.card_images[0].image_url;
// const n = url.lastIndexOf('.');
// const extension = url.substring(n + 1);

//     download.image({
//         url: url,
//         dest: `../../public/cardImg/${name}.${extension}`,
//         });
//     }
// }

// asynchronous loop
// let index = 0;
// const wait = (ms) => new Promise((resolve)=> setTimeout(resolve, ms));

// async function start(){
// for(let key = index; key < cardData.length; key++){
//     const card = cardData[key];
//     Download(card);
//     await wait(300);
// }
// }

// start();

// Seed Data
const data = require('./data');

// * Call Dependencies

// Express
const app = express();

// Dotenv
require("dotenv").config();

// * Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);

// Database Connection Error/Success + Define Callback Functions
const db = mongoose.connection;
db.on("error", (err) => console.log("an error occurred: " + err.message));
db.on("connected", () => console.log("connected to mongoDB"));
db.on("disconnected", () => console.log("disconnected from mongoDB"));


// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({
    extended: true
}));

// Middleware to allow CSS and JS
app.use('/public', express.static('public'));


// Seed Route

app.get('/yugioh/seed', (req, res) => {
Card.deleteMany({}, (err, results)=>{
Card.create(data, (err, results)=>{
res.redirect('/yugioh');
});
});
});

// Loop through json for each, build a new object with the right fields


// * Mount Routes

// Index
app.get("/yugioh", (req, res) => {
    Card.find({}, (error, allCards) => {
        res.render("index.ejs", {
            cards: allCards,
            cardData: cardData,
        });
    });
});

// New

app.get("/yugioh/new", (req, res) => {
    res.render("new.ejs");
});

// Delete


// Update


// Create

app.post("/yugioh", (req, res) => {
    Card.create(req.body, (error, createdCard) => {
        res.redirect("/yugioh");
    });
});

app.get("/yugioh-createCards", (req, res) => {
    cardData.forEach(function(card) {
        // console.log(card.card_sets)
        if (card.card_sets == undefined) { return }
        if (card.card_sets[0] == undefined) { return }
        Card.create({
          name: card.name,
          boxSet: card.card_sets[0].set_name,
        cardDescription: card.desc,
        img: card.id,
        cardType: card.type,
        price: card.card_prices[0].tcgplayer_price,
        attack: card.atk,
        defense: card.def,
        race: card.race,
        archetype: card.archetype,
        rarity: card.card_sets[0].set_rarity,
        attribute: card.attribute,
        level: card.level

        })
      })
})


// Edit


//Show

app.get("/yugioh/:id", (req, res) => {
    Card.findById(req.params.id, (err, foundCard) => {
        res.render("show.ejs", {
            card: foundCard,
        });
    });
});

// app.get("/yugioh/:id"(req, res) = {
//     User.findById(req.params.id, (err, foundUser) => {
//         res.render("myCards.ejs", {
//             user: foundUser,
//         });
//     });
// });

// * Set Up Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));