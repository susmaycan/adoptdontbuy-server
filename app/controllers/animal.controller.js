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
            yearBorn: req.body.yearBorn || "unknown",
            country: req.body.country || "Spain",
            region: req.body.region || "unknown",
            province: req.body.province || "unknown",
            city: req.body.city || "unknown",
            picture: req.body.picture || [],
            about: req.body.about || "unknown",
            castrated: req.body.castrated || false,
            vaccinated: req.body.vaccinated || false,
            alongWithDogs: req.body.alongWithDogs || false,
            alongWithCats: req.body.alongWithCats || false,
            alongWithKids: req.body.alongWithKids || false,
            socialLevel: req.body.socialLevel || 0,
            traumaLevel: req.body.traumaLevel || 0,
            energyLevel: req.body.energyLevel || 0,
            owner: id || "unknown",
            status: req.body.status || "00"
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
                        console.log("Data ", data);
                        console.log("Animal ", animal);
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

        console.log("GETTING ", req.body);

        // Find animal and update it with the request body
        await Animal.findByIdAndUpdate(req.params.animalId, {
            name: req.body.name,
            specie: req.body.specie || "unknown",
            breed: req.body.breed || "unknown",
            gender: req.body.gender || "unknown",
            size: req.body.size || "unknown",
            yearBorn: req.body.yearBorn || "unknown",
            country: req.body.country || "unknown",
            region: req.body.region || "unknown",
            province: req.body.province || "unknown",
            city: req.body.city || "unknown",
            picture: req.body.picture || [],
            about: req.body.about || "unknown",
            castrated: req.body.castrated || false,
            vaccinated: req.body.vaccinated || false,
            alongWithDogs: req.body.alongWithDogs || false,
            alongWithCats: req.body.alongWithCats || false,
            alongWithKids: req.body.alongWithKids || false,
            socialLevel: req.body.socialLevel || 0,
            traumaLevel: req.body.traumaLevel || 0,
            energyLevel: req.body.energyLevel || 0,
            owner: req.body.owner || "unknown",
            status: req.body.status || "00"
        }, { new: true })
            .then(animal => {
                if (!animal) {
                    return res.status(404).send({
                        message: "Animal not found with id " + req.params.animalId
                    });
                }
                console.log("UPDATED ", animal);
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
    },
    filter: async (req, res) => {
        var query = {};

        if (req.query.city !== undefined && req.query.city !== '' && req.query.city !== null) {
            query.city = req.query.city;
        }

        if (req.query.province !== undefined && req.query.province !== '' && req.query.province !== null && req.query.province !== "-1") {
            query.province = req.query.province;
        }

        if (req.query.region !== undefined && req.query.region !== '' && req.query.region !== null && req.query.region !== "-1") {
            query.region = req.query.region;
        }

        if (req.query.size !== undefined && req.query.size !== '' && req.query.size !== null && req.query.size !== "-1") {
            query.size = req.query.size;
        }

        if (req.query.gender !== undefined && req.query.gender !== '' && req.query.gender !== null && req.query.gender !== "-1") {
            query.gender = req.query.gender;
        }

        if (req.query.specie !== undefined && req.query.specie !== '' && req.query.specie !== null && req.query.specie !== "-1") {
            query.specie = req.query.specie;
        }

        if (req.query.yearBorn !== undefined && req.query.yearBorn !== '' && req.query.yearBorn !== null && req.query.yearBorn !== "-1") {
            query.yearBorn = req.query.yearBorn;
        }

        if (req.query.castrated !== undefined && req.query.castrated !== '' && req.query.castrated !== null && req.query.castrated !== "-1") {
            query.castrated = req.query.castrated;
        }

        if (req.query.vaccinated !== undefined && req.query.vaccinated !== '' && req.query.vaccinated !== null && req.query.vaccinated !== "-1") {
            query.vaccinated = req.query.vaccinated;
        }

        if (req.query.alongWithDogs !== undefined && req.query.alongWithDogs !== '' && req.query.alongWithDogs !== null && req.query.alongWithDogs !== "-1") {
            query.alongWithDogs = req.query.alongWithDogs;
        }

        if (req.query.alongWithCats !== undefined && req.query.alongWithCats !== '' && req.query.alongWithCats !== null && req.query.alongWithCats !== "-1") {
            query.alongWithCats = req.query.alongWithCats;
        }

        if (req.query.alongWithKids !== undefined && req.query.alongWithKids !== '' && req.query.alongWithKids !== null && req.query.alongWithKids !== "-1") {
            query.alongWithKids = req.query.alongWithKids;
        }
        //TODO add birthdate and owner?


        const ORDER_DESC_BY_DATE = -1;

        await Animal.find(query).sort({ 'updatedAt': ORDER_DESC_BY_DATE })
            .then(animals => {
                console.log("Query ", query);
                res.send(animals);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving animals."
                });
            });


    }
}