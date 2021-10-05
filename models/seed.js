const mongoose = require('mongoose')
require('dotenv').config();

async function seed () {
    mongoose.connect(process.env.DATABASE_URI);

    const Event = require('./eventschema.js');

    try {
        await Event.create({
            title: 'Wiggles Concert',
            descritpion: 'fun times',
            location: [],
            formatted_address:'123 Sunshine Blvd, San Diego, CA 12345',
            date: '12/12/21',
            email: 'blusteryday@gmail.com',
        });
    } catch (error) {
        console.error('big ol error');
    }
    mongoose.disconnect()
}

seed();