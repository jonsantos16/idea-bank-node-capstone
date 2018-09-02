"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const entrySchema = new mongoose.Schema({
    entryType: {
        type: String,
        required: false
    },
    inputTitle: {
        type: String,
        required: false
    },
    inputContent: {
        type: String,
        required: false
    },
    inputAuthor: {
        type: String,
        required: false
    },
    loggedInUserName: {
        type: String,
        required: false
    },
    createdDate: {
        type: String,
        required: false
    }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;