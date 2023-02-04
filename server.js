// * Set Dependencies

// Express
const express = require("express");

// Mongoose
const mongoose = require("mongoose");
const Card = require("./models/card.js");


// Router 
const cardRouter = require("./controllers/cards");
const userRouter = require("./controllers/users");

// File System Module
const fs = require("fs");
let rawData = fs.readFileSync("./models/card_info.json");
const cardData = JSON.parse(rawData).data;
// console.log(cardData);

// Express Session
const session = require("express-session");

// File Upload
const fileUpload = require("express-fileupload");

// Cloudinary
const cloudinary = require("cloudinary").v2;


//* create for each here (create new route - reference)

// // // Image Downloader
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

// // asynchronous loop
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


// Configure Settings

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

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

// Express session
app.use(session({
secret: process.env.SECRET,
resave: false,
cookie: {maxAge: 1000 * 60 * 60 * 24},
saveUninitialized: false

}));

app.use((req, res, next) =>{
    if(req.session.userId) {
        res.locals.user = req.session.userId;
    } else {
    res.locals.user = null;
}
next();
});

// authentication middleware
function isAuthenticated(req, res, next) {
    if(!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

// File upload middleware

app.use(fileUpload({ createParentPath: true}));


// custom middleware to inspect session store - for development

// app.use((req, res, next)=>{
// console.log(req.session);
// next();

// });


// app.get("/yugioh/:id"(req, res) = {
//     User.findById(req.params.id, (err, foundUser) => {
//         res.render("myCards.ejs", {
//             user: foundUser,
//         });
//     });
// });


app.use(userRouter);
app.use(isAuthenticated, cardRouter);



// * Set Up Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));