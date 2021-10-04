'use strict';

// server setup

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

//initialize mongoose

// const mongoose = require('mongoose');
// mongoose.connect();






app.listen(PORT, () => console.log(`screaming into the void of ${PORT}`));
