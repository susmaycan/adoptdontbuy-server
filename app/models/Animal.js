const mongoose = require('mongoose')
const { LITERALS, ANIMAL_STATUS, MODEL } = require('../utils/const')

const AnimalSchema = mongoose.Schema({
    [MODEL.ANIMAL.NAME]: {
        type: String,
        required: true
    },
    [MODEL.ANIMAL.SPECIE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.BREED]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.GENDER]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.SIZE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.AGE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.COUNTRY]: {
        type: String,
        default: LITERALS.DEFAULT_COUNTRY,
        required: false
    },
    [MODEL.ANIMAL.REGION]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.PROVINCE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.CITY]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.PICTURES]: {
        type: [String],
        default: [],
        required: false
    },
    [MODEL.ANIMAL.ABOUT]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.ANIMAL.CASTRATED]: {
        type: Boolean,
        default: false,
        required: false
    },
    [MODEL.ANIMAL.VACCINATED]: {
        type: Boolean,
        default: false,
        required: false
    },
    [MODEL.ANIMAL.ALONG_WITH_DOGS]: {
        type: Boolean,
        default: false,
        required: false
    },
    [MODEL.ANIMAL.ALONG_WITH_CATS]: {
        type: Boolean,
        default: false,
        required: false
    },
    [MODEL.ANIMAL.ALONG_WITH_KIDS]: {
        type: Boolean,
        default: false,
        required: false
    },
    [MODEL.ANIMAL.SOCIAL_LEVEL]: {
        type: Number,
        default: 0,
        required: true
    },
    [MODEL.ANIMAL.TRAUMA_LEVEL]: {
        type: Number,
        default: 0,
        required: true
    },
    [MODEL.ANIMAL.ENERGY_LEVEL]: {
        type: Number,
        default: 0,
        required: true
    },
    [MODEL.ANIMAL.STATUS]: {
        type: String,
        default: ANIMAL_STATUS.IN_ADOPTION,
        required: true
    },
    [MODEL.ANIMAL.OWNER]: {
        type: String,
        ref: LITERALS.USER,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model(LITERALS.ANIMAL, AnimalSchema)
