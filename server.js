// * Set Dependencies

// Express
const express = require("express");

// Mongoose
const mongoose = require("mongoose");
const Card = require("./models/card.js");

// Models
const Book = require("./models/card.js")


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


// * Mount Routes

// Index
app.get("/yugioh", (req, res) => {
    Card.find({}, (error, allCards) => {
        res.render("index.ejs", {
            cards: allCards,
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

// Edit


//Show

app.get("/yugioh/:id", (req, res) => {
    Card.findById(req.params.id, (err, foundCard) => {
        res.render("show.ejs", {
            card: foundCard,
        });
    });
});

// * Set Up Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));

// ! Continue from have a create route create data in mongoDB