const Animal = require('../models/Animal.js');
// Create and Save a new animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Animal name can not be empty"
        });
    }
    // Create an animal
    const animal = new Animal({
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
        socialLevel: req.body.socialLevel || "unknown",
        traumaLevel: req.body.traumaLevel || "unknown",
        energyLevel: req.body.energyLevel || "unknown",
        owner: req.body.owner || "unknown"
    });

    // Save animal in the database
    animal.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the animal."
            });
        });
};
const ORDER_DESC_BY_DATE = -1;
// Retrieve and return all animals from the database.
exports.findAll = (req, res) => {
    Animal.find().sort({ 'updatedAt': ORDER_DESC_BY_DATE }).limit(9)
        .then(animals => {
            res.send(animals);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving animals."
            });
        });
};

// Find a single animal with a animalId
exports.findOne = (req, res) => {
    Animal.findById(req.params.animalId)
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
};

// Update a animal identified by the animalId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Animal name can not be empty"
        });
    }

    // Find animal and update it with the request body
    Animal.findByIdAndUpdate(req.params.animalId, {
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
};

// Delete a animal with the specified animalId in the request
exports.delete = (req, res) => {
    Animal.findByIdAndRemove(req.params.animalId)
        .then(animal => {
            if (!animal) {
                return res.status(404).send({
                    message: "Animal not found with id " + req.params.animalId
                });
            }
            res.send({ message: "Animal deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Animal not found with id " + req.params.animalId
                });
            }
            return res.status(500).send({
                message: "Could not delete animal with id " + req.params.animalId
            });
        });
};
