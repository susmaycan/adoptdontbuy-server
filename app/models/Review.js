const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    title: String,
    desc: String,
    ranking: Number,
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
