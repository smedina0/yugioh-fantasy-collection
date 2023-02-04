const express = require('express');
const router = express.Router();
const data = require('../data');
const Card = require('../models/card');
const fs = require("fs");
let rawData = fs.readFileSync("./models/card_info.json");
const cardData = JSON.parse(rawData).data;
const cloudinary = require("cloudinary").v2;



// Seed Route

router.get('/yugioh/seed', (req, res) => {
    Card.deleteMany({}, (err, results)=>{
    Card.create(data, (err, results)=>{
    res.redirect('/yugioh');
    });
    });
    });
    
    // Loop through json for each, build a new object with the right fields
    
    
    // * Mount Routes
    
    // Index
    router.get("/yugioh", (req, res) => {
        Card.find({}, (error, allCards) => {
            res.render("index.ejs", {
                cards: allCards,
                cardData: cardData,
            });
        });
    });
    
    // New
    
    router.get("/yugioh/new", (req, res) => {
        res.render("new.ejs");
    });
    
    // Delete
    
    
    // Update
    
    
    // Create
   

    router.post("/yugioh", (req, res) => {
        const src = req.files.src;
        src.mv(`./uploads/${src.name}`);
      
     
        cloudinary.uploader.upload(`./uploads/${src.name}`, (err, result) => {
            req.body.src = result.secure_url;
            console.log(err, result);
            Card.create(req.body, (error, createdCard) => {
                res.redirect("/yugioh");
        });

      
        });
    });

  
    
    router.get("/yugioh-createCards", (req, res) => {
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
          res.redirect("/yugioh");
    })
    

    
    // Edit
    
    
    //Show
    
    router.get("/yugioh/:id", (req, res) => {
        Card.findById(req.params.id, (err, foundCard) => {
            res.render("show.ejs", {
                card: foundCard,
            });
        });
    });


module.exports = router;