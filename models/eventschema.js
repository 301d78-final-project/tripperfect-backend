'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema ({
    title: {type: String},
    description: {type: String},
    location:{type: Array},
    formatted_address:{type: String},
    date: {type: String},
    email: {type: String},
})

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
