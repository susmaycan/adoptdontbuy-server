const mongoose = require('mongoose')
const { LITERALS, MODEL } = require('../utils/const')

const UserSchema = mongoose.Schema({
    [MODEL.USER.ID]: {
        type: String,
        required: true
    },
    [MODEL.USER.PHONE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.PICTURE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.IS_ANIMAL_SHELTER]: {
        type: Boolean,
        default: false,
        required: false
    },
    [MODEL.USER.WEBSITE]: {
        type: String,
        default: LITERALS.UNKNOWN_WEBSITE,
        required: false
    },
    [MODEL.USER.ADDRESS_LINE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.COUNTRY]: {
        type: String,
        default: LITERALS.DEFAULT_COUNTRY,
        required: false
    },
    [MODEL.USER.REGION]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.PROVINCE]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.CITY]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.DESCRIPTION]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.FIST_NAME]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.LAST_NAME]: {
        type: String,
        default: LITERALS.UNKNOWN,
        required: false
    },
    [MODEL.USER.EMAIL]: {
        type: String,
        required: true
    },
    [MODEL.USER.USERNAME]: {
        type: String,
        required: true
    },

    [MODEL.USER.ANIMALS]: [
        { type: mongoose.Schema.Types.ObjectId, ref: LITERALS.ANIMAL }
    ],

    [MODEL.USER.FAVOURITES]: [
        { type: mongoose.Schema.Types.ObjectId, ref: LITERALS.ANIMAL }
    ],

    [MODEL.USER.REVIEWS]: [
        { type: mongoose.Schema.Types.ObjectId, ref: LITERALS.REVIEW }
    ],
}, {
    timestamps: true,
    _id: false
})

module.exports = mongoose.model(LITERALS.USER, UserSchema)
