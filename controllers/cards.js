const express = require('express');
const router = express.Router();
const data = require('../data');
const Card = require('../models/card');
const UserCard = require('../models/userCard');
const fs = require('fs');
let rawData = fs.readFileSync('./models/card_info.json');
const cardData = JSON.parse(rawData).data;
const cloudinary = require('cloudinary').v2;

// Seed Route

router.get('/yugioh/seed', (req, res) => {
  Card.deleteMany({}, (err, results) => {
    Card.create(data, (err, results) => {
      res.redirect('/yugioh');
    });
  });
});

// * Mount Routes

// // Index
// router.get("/yugioh", (req, res) => {
//     Card.find({}, (error, allCards) => {
//         res.render("index.ejs", {
//             cards: allCards,
//             cardData: cardData,
//         });
//     })
// });

// Index
router.get('/yugioh', (req, res) => {
  const currentLetter = req.query.letter || 'A';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  User.findById(req.session.userId, (err, foundUser) => {
    Card.find(
      { name: new RegExp('^' + currentLetter, 'i') },
      (error, allCards) => {
        if (error) {
          console.log(error);
          return res.redirect('/yugioh');
        }

        res.render('index.ejs', {
          cards: allCards,
          cardData: cardData,
          currentLetter: currentLetter,
          alphabet: alphabet,
          user: foundUser, // pass the user object to the view
        });
      }
    );
  });
});

// - User List Index

router.get('/yugioh/mycards', (req, res) => {
  UserCard.find(
    {
      userId: req.session.userId,
    },
    (error, userCards) => {
      Card.find(
        {
          _id: userCards.map((userCard) => userCard.cardId),
        },
        (error, allCards) => {
          res.render('userCards/index.ejs', {
            cards: allCards,
            cardData: cardData,
          });
        }
      );
    }
  );
});

// New

router.get('/yugioh/new', (req, res) => {
  res.render('new.ejs');
});

// Delete

router.delete('/yugioh/mycards/:id', (req, res) => {
  Card.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/yugioh/mycards');
  });
});

// Update

router.put('/yugioh/mycards/:id', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (error, updatedCard) => {
      res.redirect(`/yugioh/mycards/${req.params.id}`);
    }
  );
});

// Create

router.post('/yugioh', (req, res) => {
  Card.findOne({ name: req.body.name }, (error, foundCard) => {
    if (error) {
      console.log(error);
      return res.redirect('/yugioh');
    }
    if (foundCard) {
      UserCard.create(
        { userId: req.session.userId, cardId: foundCard._id },
        (error, createdUserCard) => {
          if (error) {
            console.log(error);
            return res.redirect('/yugioh');
          }
          res.redirect('/yugioh/mycards');
        }
      );
    } else {
      const src = req.files.src;
      src.mv(`./uploads/${src.name}`);

      cloudinary.uploader.upload(`./uploads/${src.name}`, (err, result) => {
        req.body.src = result.secure_url;
        console.log(err, result);
        Card.create(req.body, (error, createdCard) => {
          if (error) {
            console.log(error);
            return res.redirect('/yugioh');
          }
          UserCard.create(
            { userId: req.session.userId, cardId: createdCard._id },
            (error, createdUserCard) => {
              if (error) {
                console.log(error);
                return res.redirect('/yugioh');
              }
              res.redirect('/yugioh/mycards');
            }
          );
        });
      });
    }
  });
});

// Add to User Cards
router.post('/yugioh/mycards', (req, res) => {
  const userId = req.session.userId;
  const cardId = req.body.cardId;

  UserCard.create(
    { userId: userId, cardId: cardId },
    (error, createdUserCard) => {
      if (error) {
        console.log(error);
        return res.redirect('/yugioh');
      }
      res.redirect('/yugioh/mycards');
    }
  );
});

// router.get("/yugioh-createCards", (req, res) => {
//     cardData.forEach(function(card) {
//         console.log(card.card_sets)
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

router.get('/yugioh/mycards/:id/edit', (req, res) => {
  Card.findById(req.params.id, (error, foundCard) => {
    res.render('edit.ejs', {
      card: foundCard,
    });
  });
});

//Show

router.get('/yugioh/:id', (req, res) => {
  Card.findById(req.params.id, (err, foundCard) => {
    res.render('show.ejs', {
      card: foundCard,
    });
  });
});

// - User List Show

router.get('/yugioh/mycards/:id', (req, res) => {
  Card.findById(req.params.id, (err, foundCard) => {
    res.render('userCards/show.ejs', {
      card: foundCard,
    });
  });
});

module.exports = router;
