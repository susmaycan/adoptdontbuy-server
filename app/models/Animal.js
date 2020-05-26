const mongoose = require('mongoose')

const AnimalSchema = mongoose.Schema({
    name: String,
    specie: String,
    breed: String,
    gender: String,
    size: String,
    yearBorn: String,
    age: String,
    country: String,
    region: String,
    province: String,
    city: String,
    picture: [String],
    about: String,
    castrated: Boolean,
    vaccinated: Boolean,
    alongWithDogs: Boolean,
    alongWithCats: Boolean,
    alongWithKids: Boolean,
    socialLevel: Number,
    traumaLevel: Number,
    energyLevel: Number,
    status: String,
    owner: {
        type: String,
        ref:'User'
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Animal', AnimalSchema)
