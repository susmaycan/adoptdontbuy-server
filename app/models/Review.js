const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    desc: String,
    rating: Number,
    from: {
        type: String,
        ref:'User'
    },
    to: {
        type: String,
        ref:'User'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', ReviewSchema)
