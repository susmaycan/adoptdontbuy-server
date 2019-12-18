const User = require('../models/User.js');
const AnimalController = require('./animal.controller');
const Animal = require('../models/Animal.js');

// Create and Save a new user
module.exports = {

    create: async (req, res) => {
        if (!req.body._id) {
            return res.status(400).send({
                message: "User _id can not be empty"
            });
        }

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
            animals: req.body.animals || [],
            likedAnimals: req.body.likedAnimals || [],
            adopted: req.body.adopted || [],
            reserved: req.body.reserved || []
        });

        await user.save()
            .then(data => {
                res.send(data);
                console.log("Saved user");
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            });

        console.log("Exiting create user...");

    },

    // Retrieve and return all users from the database.
    animalsByUser: async (req, res) => {
        await User.findById(req.params.userId).populate('animals')
            .then(users => {
                console.log("User's animals retrieved");
                res.send(users.animals);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
        console.log("Exiting animalsByUser...");
    },


    // Retrieve and return all users from the database.
    findAll: async (req, res) => {
        await User.find()
            .then(users => {
                res.send(users);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
    },

    // Find a single user with a userId
    findOne: async (req, res) => {
        var id = req;
        if (req.params !== undefined) {
            id = req.params.userId;
        }
        await User.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + id
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving user with id " + id
                });
            });
    },

    // Update a user identified by the userId in the request
    update: async (req, res) => {
        // Validate Request
        if (!req.body._id) {
            return res.status(400).send({
                message: "User id can not be empty"
            });
        }

        // Find user and update it with the request body
        await User.findByIdAndUpdate(req.params.userId, {
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
            animals: req.body.animals || ["unknown"],     likedAnimals: req.body.likedAnimals || [],
            adopted: req.body.adopted || [],
            reserved: req.body.reserved || []
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
    },

    // Delete a user with the specified userId in the request
    delete: async (req, res) => {
        var userToDelete = null;

        //We delete the user
        await User.findByIdAndDelete(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                userToDelete = user;
                res.send({ message: "User deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                console.log("Error in delete user: ", err.message);
                return res.status(500).send({
                    message: "Could not delete user with id " + req.params.userId
                });
            });

        //We delete the user's animals if we deleted the user correctly
        if (res.statusCode === 200) {
            for (const animal of userToDelete.animals) {
                const id = animal;
                await Animal.findByIdAndRemove(id)
                    .then(animalToDelete => {
                        console.log("Delete ", animalToDelete);
                        if (!animalToDelete) {
                            return res.status(404).send({
                                message: "Animal not found with id " + id
                            });
                        }
                    }).catch(err => {
                        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                            return res.status(404).send({
                                message: "Animal not found with id " + id
                            });
                        }
                        console.log("Error in delete animal ", err.message);
                        return res.status(500).send({
                            message: "Could not delete animal with id " + id
                        });
                    });
            };

        }
        console.log("Exiting delete user...");
    }
}
