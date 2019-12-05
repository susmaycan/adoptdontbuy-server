const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
    name: String,
    specie: String,
    breed: String,
    gender: String,
    size: String,
    status: String,
    yearBorn: String,
    country: String,
    region: String,
    province: String,
    city: String,
    picture: String,
    about: String,
    castrated: String,
    vaccinated: String,
    alongWithDogs: String,
    alongWithCats: String,
    alongWithKids: String,
    socialLevel: String,
    traumaLevel: String,
    energyLevel: String, 
    owner: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', AnimalSchema);