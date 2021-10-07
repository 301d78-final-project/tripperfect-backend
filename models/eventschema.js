'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
    title: { type: String },
    description: { type: String },
    location: { type: Array },
    date: { type: String },
    email: { type: String },
})

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;