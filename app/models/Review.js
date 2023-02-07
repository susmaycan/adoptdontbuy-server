const mongoose = require('mongoose')
const { LITERALS, MODEL } = require('../utils/const')

const ReviewSchema = mongoose.Schema({
    [MODEL.REVIEW.DESC]: {
        type: String,
        default: LITERALS.EMPTY,
        required: false
    },
    [MODEL.REVIEW.RATING]: {
        type: Number,
        default: 0,
        required: true
    },
    [MODEL.REVIEW.FROM]: {
        type: String,
        ref: LITERALS.USER,
        required: true
    },
    [MODEL.REVIEW.TO]: {
        type: String,
        ref: LITERALS.USER,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model(LITERALS.REVIEW, ReviewSchema)
