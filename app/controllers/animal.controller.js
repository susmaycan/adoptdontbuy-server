const Animal = require('../models/Animal.js');
var mongoose = require('mongoose');
const User = require('../models/User.js');
module.exports = {
    // Create and Save a new animal
    create: async (req, res) => {
        // Validate request
        if (!req.body.name) {
            return res.status(400).send({
                message: "Animal name can not be empty"
            });
        }
        var id = req.body.owner;
        // Create an animal
        const animal = new Animal({
            name: req.body.name,
            specie: req.body.specie || "unknown",
            breed: req.body.breed || "unknown",
            gender: req.body.gender || "unknown",
            size: req.body.size || "unknown",
            status: req.body.status || "unknown",
            yearBorn: req.body.yearBorn || "unknown",
            country: req.body.country || "Spain",
            region: req.body.region || "unknown",
            province: req.body.province || "unknown",
            city: req.body.city || "unknown",
            picture: req.body.picture || "unknown",
            about: req.body.about || "unknown",
            castrated: req.body.castrated || "unknown",
            vaccinated: req.body.vaccinated || "unknown",
            alongWithDogs: req.body.alongWithDogs || "unknown",
            alongWithCats: req.body.alongWithCats || "unknown",
            alongWithKids: req.body.alongWithKids || "unknown",
            socialLevel: req.body.socialLevel || "unknown",
            traumaLevel: req.body.traumaLevel || "unknown",
            energyLevel: req.body.energyLevel || "unknown",
            owner: id || "unknown"
        });

        // Save animal in the database
        await animal.save()
            .then(data => {
                 User.findById(id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).send({
                                message: "User not found with id " + req.params.userId
                            });
                        }
                        user.animals.push(animal);
                        user.save();
                        res.send(data);

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
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the animal."
                });
            });
    },

    
    // Retrieve and return all animals from the database.
    findAll: async (req, res) => {
        const ORDER_DESC_BY_DATE = -1;

        await Animal.find().sort({ 'updatedAt': ORDER_DESC_BY_DATE }).limit(9)
            .then(animals => {
                res.send(animals);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving animals."
                });
            });
    },

    // Find a single animal with a animalId
    findOne: async (req, res) => {
        await Animal.findById(req.params.animalId).populate('owner')
            .then(animal => {
                if (!animal) {
                    return res.status(404).send({
                        message: "Animal not found with id " + req.params.animalId
                    });
                }
                res.send(animal);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Animal not found with id " + req.params.animalId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving animal with id " + req.params.animalId
                });
            });
    },

    // Update a animal identified by the animalId in the request
    update: async (req, res) => {
        // Validate Request
        if (!req.body.name) {
            return res.status(400).send({
                message: "Animal name can not be empty"
            });
        }

        // Find animal and update it with the request body
        await Animal.findByIdAndUpdate(req.params.animalId, {
            name: req.body.name,
            specie: req.body.specie || "unknown",
            breed: req.body.breed || "unknown",
            gender: req.body.gender || "unknown",
            size: req.body.size || "unknown",
            status: req.body.status || "unknown",
            yearBorn: req.body.yearBorn || "unknown",
            country: req.body.country || "unknown",
            region: req.body.region || "unknown",
            province: req.body.province || "unknown",
            city: req.body.city || "unknown",
            picture: req.body.picture || "unknown",
            about: req.body.about || "unknown",
            castrated: req.body.castrated || "unknown",
            vaccinated: req.body.vaccinated || "unknown",
            alongWithDogs: req.body.alongWithDogs || "unknown",
            alongWithCats: req.body.alongWithCats || "unknown",
            alongWithKids: req.body.alongWithKids || "unknown",
            socialLevel: req.body.socialLevel || "unknow",
            traumaLevel: req.body.traumaLevel || "unknown",
            energyLevel: req.body.energyLevel || "unknown",
            owner: req.body.owner || "unknown"
        }, { new: true })
            .then(animal => {
                if (!animal) {
                    return res.status(404).send({
                        message: "Animal not found with id " + req.params.animalId
                    });
                }
                res.send(animal);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Animal not found with id " + req.params.animalId
                    });
                }
                return res.status(500).send({
                    message: "Error updating animal with id " + req.params.animalId
                });
            });
    },

    // Delete a animal with the specified animalId in the request
    delete: async (req, res) => {
        var id = req.params.animalId;

        await Animal.findByIdAndDelete(id)
            .then(animal => {
                console.log(animal);
                if (!animal) {
                    return res.status(404).send({
                        message: "Animal not found with id " + id
                    });
                }
                res.send({ message: "Animal deleted successfully!" });

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
    }
}