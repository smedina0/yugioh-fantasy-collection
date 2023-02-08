const express = require('express');
const router = express.Router();
const data = require('../data');
const Card = require('../models/card');
const UserCard = require("../models/userCard");
const fs = require("fs");
let rawData = fs.readFileSync("./models/card_info.json");
const cardData = JSON.parse(rawData).data;
const cloudinary = require("cloudinary").v2;



// Seed Route

router.get('/yugioh/seed', (req, res) => {
    Card.deleteMany({}, (err, results) => {
        Card.create(data, (err, results) => {
            res.redirect('/yugioh');
        });
    });
});

// * Mount Routes

// Index
router.get("/yugioh", (req, res) => {
    const page = req.query.p || 0;
    const cardsPerPage = 100;


    Card.find({}, (error, allCards) => {
        res.render("index.ejs", {
            cards: allCards,
            cardData: cardData,
        });
    })
    .skip(page * cardsPerPage)
    .limit(cardsPerPage)
});




// - User List Index

router.get("/yugioh/mycards", (req, res) => {
    UserCard.find({
        userId: req.session.userId
    }, (error, userCards) => {
        Card.find({
            _id: userCards.map(userCard => userCard.cardId)
        }, (error, allCards) => {
            res.render("userCards/index.ejs", {
                cards: allCards,
                cardData: cardData
            });
        });
    })

});


// New

router.get("/yugioh/new", (req, res) => {
    res.render("new.ejs");
});



// Delete


router.delete("/yugioh/mycards/:id", (req, res) => {
    Card.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/yugioh/mycards");
    })
})

// Update

router.put("/yugioh/mycards/:id", (req, res) => {
    
    Card.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
        (error, updatedCard) => {
          res.redirect(`/yugioh/mycards/${req.params.id}`)
        });
  });


// Create


router.post("/yugioh", (req, res) => {
    const src = req.files.src;
    src.mv(`./uploads/${src.name}`);



    cloudinary.uploader.upload(`./uploads/${src.name}`, (err, result) => {
        req.body.src = result.secure_url;
        console.log(err, result);
        Card.create(req.body, (error, createdCard) => {
            UserCard.create(req.body, (error, createdCard) => {
            res.redirect("/yugioh");
        });
    });

    });
});

router.post("/yugioh", (req, res) => {


    Card.create(req.body, (error, createdCard) => {
        res.redirect("/yugioh");
    });

});

router.post("/yugioh/mycards", (req, res) => {

    UserCard.create(req.body, (error, createdCard) => {
        res.redirect("/yugioh/mycards");
    });
});


// router.get("/yugioh-createCards", (req, res) => {
//     cardData.forEach(function(card) {
//         // console.log(card.card_sets)
//         if (card.card_sets == undefined) { return }
//         if (card.card_sets[0] == undefined) { return }
//         Card.create({
//           name: card.name,
//           boxSet: card.card_sets[0].set_name,
//         cardDescription: card.desc,
//         img: card.card_images[0].image_url,
//         cardType: card.type,
//         price: card.card_prices[0].tcgplayer_price,
//         attack: card.atk,
//         defense: card.def,
//         race: card.race,
//         archetype: card.archetype,
//         rarity: card.card_sets[0].set_rarity,
//         attribute: card.attribute,
//         level: card.level

//         })

//       })
//       res.redirect("/yugioh");
// })



// Edit

router.get("/yugioh/mycards/:id/edit", (req, res) => {
    Card.findById(req.params.id, (error, foundCard) => {
      res.render("edit.ejs", {
        card: foundCard,
      })
    })
  })

//Show

router.get("/yugioh/:id", (req, res) => {
    Card.findById(req.params.id, (err, foundCard) => {
        res.render("show.ejs", {
            card: foundCard,
        });
    });
});

// - User List Show

router.get("/yugioh/mycards/:id", (req, res) => {
    Card.findById(req.params.id, (err, foundCard) => {
        res.render("userCards/show.ejs", {
            card: foundCard,
        });
    });
});

module.exports = router;