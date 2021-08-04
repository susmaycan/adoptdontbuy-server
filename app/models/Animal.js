const mongoose = require('mongoose')
const { LITERALS, ANIMAL_STATUS } = require('../utils/const')

const AnimalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    breed: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    gender: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    size: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    yearBorn: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    age: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    country: {
        type: String,
        default: LITERALS.DEFAULT_COUNTRY,
        required: false
    },
    region: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    province: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    city: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    picture: {
        type: [String],
        default: [],
        required: false
    },
    about: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    castrated: {
        type: Boolean,
        default: false,
        required: false
    },
    vaccinated: {
        type: Boolean,
        default: false,
        required: false
    },
    alongWithDogs: {
        type: Boolean,
        default: false,
        required: false
    },
    alongWithCats: {
        type: Boolean,
        default: false,
        required: false
    },
    alongWithKids: {
        type: Boolean,
        default: false,
        required: false
    },
    socialLevel: {
        type: Number,
        default: 0,
        required: true
    },
    traumaLevel: {
        type: Number,
        default: 0,
        required: true
    },
    energyLevel: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        default: ANIMAL_STATUS.IN_ADOPTION,
        required: true
    },
    owner: {
        type: String,
        ref: LITERALS.USER
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model(LITERALS.ANIMAL, AnimalSchema)
