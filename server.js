'use strict';

// server setup

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY

//initialize mongoose

const mongoose = require('mongoose');
mongoose.connect(DATABASE_URI);

const EventModel = require('./models/eventschema.js');

//routes
app.get('/test', (req, res) => {
    res.send('test request received')
})

app.get('/events', async (req, res) => {
    const location = req.query.location;
    console.log(location)
    const mapboxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${MAPBOX_API_KEY}`
    console.log(mapboxAPI);


    try {
    const locationResponse = await axios.get(mapboxAPI);
    res.send(locationResponse.data)
    }
    catch (error) {
        res.status(400).send('whoops from inside get');
    }
   
})

app.post('/events', async (req, res) => {

    try {
        const mapInfo = req.body;

        const newEvent = await EventModel.create({
            title: mapInfo.title,
            description: mapInfo.description,
            location: mapInfo.location,
            formatted_address: mapInfo.formatted_address,
            date: mapInfo.date,
            email: mapInfo.email,
        });
        res.status(201).send(newEvent);
    } catch(error) {
        res.status(500).send('error from inside post')
    }
})

app.delete('/events/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const event = await EventModel.find({_id: id})

        if (!event) {
            res.status(400).send('error inside delete');
        }
        await EventModel.findByIdAndDelete(id);
        res.send('success from delete');
    } catch (error) {
        res.status(400).send('error from delete catch');
    }
})


app.listen(PORT, () => console.log(`screaming into the void of ${PORT}`));
