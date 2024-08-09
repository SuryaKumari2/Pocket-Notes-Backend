const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Optional: to keep track of group members
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'  // To keep track of notes in this group
    }]
});

module.exports = mongoose.model('Group', groupSchema);