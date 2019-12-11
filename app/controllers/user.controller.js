const Animal = require('../models/Animal.js');
const User = require('../models/User.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body._id) {
        return res.status(400).send({
            message: "User _id can not be empty"
        });
    }
    // Create an user
    const user = new User({
        _id: req.body._id,
        phone: req.body.phone || "unknown",
        animal_shetter: req.body.animal_shetter || false,
        website: req.body.website || "unknown",
        address_line: req.body.address_line || "unknown",
        country: req.body.country || "Spain",
        region: req.body.region || "unknown",
        province: req.body.province || "unknown",
        city: req.body.city || "unknown",
        picture: req.body.picture || "unknown",
        description: req.body.description || "unknown",
        first_name: req.body.first_name || "unknown",
        last_name: req.body.last_name || "unknown",
        animals: req.body.animals || ["unknown"]
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find().sort({ 'updatedAt': -1 }).limit(9)
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body._id) {
        return res.status(400).send({
            message: "User id can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        _id: req.body._id,
        phone: req.body.phone || "unknown",
        animal_shetter: req.body.animal_shetter || false,
        website: req.body.website || "unknown",
        address_line: req.body.address_line || "unknown",
        country: req.body.country || "Spain",
        region: req.body.region || "unknown",
        province: req.body.province || "unknown",
        city: req.body.city || "unknown",
        picture: req.body.picture || "unknown",
        description: req.body.description || "unknown",
        first_name: req.body.first_name || "unknown",
        last_name: req.body.last_name || "unknown",
        animals: req.body.animals || ["unknown"]
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};
