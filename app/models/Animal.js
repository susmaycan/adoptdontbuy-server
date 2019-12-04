const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
    name: String,
    location: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', AnimalSchema);