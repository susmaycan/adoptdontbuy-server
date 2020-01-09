const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: String,
    phone: String,
    picture: { data: Buffer, contentType: String },
    animal_shetter: Boolean,
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
    animals: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],
    likedAnimals: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],
    adopted: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],
    reserved: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }
    ],
}, {
    timestamps: true,
    _id: false
});

module.exports = mongoose.model('User', UserSchema);