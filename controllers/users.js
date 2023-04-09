const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Card = require('../models/card');
const fs = require('fs');
let rawData = fs.readFileSync('./models/card_info.json');
const cardData = JSON.parse(rawData).data;
const pagination = require('pagination');
const paginator = pagination.create('search', {
  prelink: '/yugioh',
  current: 1,
  rowsPerPage: 200,
  totalResult: 10020,
});

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

// Sign up

router.get('/signup', (req, res) => {
  res.render('signup.ejs', {
    error: null,
  });
});

// Handle form Submission

router.post('/signup', (req, res) => {
  let error = null;
  if (req.body.password !== req.body.passwordConf) {
    error = 'Password and password confirmation do not match.';
    return res.render('signup.ejs', {
      error,
    });
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
  User.create(req.body, (err, newUser) => {
    req.session.userId = newUser._id;
    res.redirect('/yugioh');
  });
});

// Login

router.get('/login', (req, res) => {
  res.render('login.ejs', {
    error: null,
  });
});

router.post('/login', (req, res) => {
  // Look up user
  const error = 'Incorrect Credentials.';
  User.findOne(
    {
      email: req.body.email,
    },
    (err, foundUser) => {
      if (!foundUser) {
        return res.render('login.ejs', {
          error,
        });
      }

      const isMatched = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );

      if (!isMatched) {
        return res.render('login.ejs', {
          error,
        });
      }
      // creates a session for the authenticated user
      req.session.userId = foundUser._id;

      res.redirect('/yugioh');
    }
  );
});

// Logout

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('login.ejs');
  });
});

module.exports = router;
