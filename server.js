// * Set Dependencies

const express = require("express");


// * Call Dependencies
const app = express();
require("dotenv").config();

// * Set Up Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));