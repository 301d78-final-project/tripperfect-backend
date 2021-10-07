'use strict';

const { response } = require('express');
const EventModel = require('./eventschema.js');
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY
const TM_API_KEY = process.env.TM_API_KEY
const axios = require('axios')

const Event = {};

Event.getLocation = async (req, res) => {
  const location = req.query.location;
  const mapboxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${MAPBOX_API_KEY}`
  try {
    const locationResponse = await axios.get(mapboxAPI);
    res.send(locationResponse.data)
  }
  catch (error) {
    res.status(400).send('whoops from inside get location');
  }
}

Event.getEvents = async (req, res) => {
  const city = req.query.city;
  const startDateTime = req.query.startDateTime
  const tmAPI = `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&startDateTime=${startDateTime}&size=10&apikey=${TM_API_KEY}`
  try {
    const eventResponse = await axios.get(tmAPI);
    res.send(eventResponse.data)
  }
  catch (error) {
    res.status(400).send('error from inside get events')
  }
}

Event.getFavorites = async (req, res) => {
  const email = req.query.email;
  const events = await EventModel.find({ email: email });
  res.status(200).json(events);
}

Event.saveFavorite = async (req, res) => {
  try {
    const eventInfo = req.body;
    const newEvent = await EventModel.create({
      title: eventInfo.title,
      description: eventInfo.description,
      location: eventInfo.location,
      date: eventInfo.date,
      email: eventInfo.email,
    });
    res.status(201).send(newEvent);
  } catch (error) {
    res.status(500).send('error from inside post')
  }
}

Event.deleteFavorite = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await EventModel.find({ _id: id })
    if (!event) {
      res.status(400).send('error inside delete');
    }
    await EventModel.findByIdAndDelete(id);
    res.send('success from delete');
  } catch (error) {
    res.status(400).send('error from delete catch');
  }
}

module.exports = Event;