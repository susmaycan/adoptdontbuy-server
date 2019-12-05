const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: String,
    phone: String,
    DNI_CIF: String,
    picture: String,
    animal_shetter: Boolean,
    website: String,
    address_line: String,
    country: String,
    region: String,
    province: String,
    city: String,
    picture: String,
    description: String,
    first_name: String,
    last_name: String,
    animals : [String]
}, {
    timestamps: true,
    _id: false
});

module.exports = mongoose.model('User', UserSchema);