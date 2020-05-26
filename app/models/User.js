const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    _id: String,
    phone: String,
    picture: { data: Buffer, contentType: String },
    animal_shelter: Boolean,
    website: String,
    address_line: String,
    country: String,
    region: String,
    province: String,
    city: String,
    description: String,
    first_name: String,
    last_name: String,
    email: String,
    username: String,

    inAdoption: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],

    adoptedByOthers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],

    reserved: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],

    favourites: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],

    adoptedByMe: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],

    reviews: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
    ],
}, {
    timestamps: true,
    _id: false
})

module.exports = mongoose.model('User', UserSchema)
