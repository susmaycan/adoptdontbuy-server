const Animal = require('../models/Animal.js')
const User = require('../models/User.js')
module.exports = {

    create: async (req, res) => {
        if (!req.body.name) {
            return res.status(400).send({
                message: "UserDetail name can not be empty"
            })
        }
        const id = req.body.owner

        const animal = new Animal({
            name: req.body.name,
            specie: req.body.specie || "unknown",
            breed: req.body.breed || "unknown",
            gender: req.body.gender || "unknown",
            size: req.body.size || "unknown",
            yearBorn: req.body.yearBorn || "unknown",
            age: req.body.age || "unknown",
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
        })

        await animal.save()
            .then(data => {
                User.findById(id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).send({
                                message: "User not found with id " + id
                            })
                        }
                        user.inAdoption.push(animal)
                        user.save()
                        console.log("Data ", data)
                        console.log("UserDetail ", animal)
                        res.send(data)

                    }).catch(err => {
                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "Object id error. User not found with id " + id
                            })
                        }
                        return res.status(500).send({
                            message: "Error retrieving user with id " +id
                        })
                    })
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the animal."
                })
            })
    },

    findAll: async (req, res) => {
        const ORDER_DESC_BY_DATE = -1

        await Animal.find({status:'00'})
            .sort({ 'updatedAt': ORDER_DESC_BY_DATE })
            .limit(9)
            .then(animals => {
                res.send(animals)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving animals."
                })
            })
    },

    findOne: async (req, res) => {
        await Animal.findById(req.params.animalId).populate('owner')
            .then(animal => {
                if (!animal) {
                    return res.status(404).send({
                        message: "Animal not found"
                    })
                }
                res.send(animal)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Animal not found"
                    })
                }
                return res.status(500).send({
                    message: "Error retrieving animal"
                })
            })
    },

    update: async (req, res) => {
        if (!req.body.name) {
            return res.status(400).send({
                message: "UserDetail name can not be empty"
            })
        }

        console.log("GETTING ", req.body)

        await Animal.findByIdAndUpdate(req.params.animalId, {
            name: req.body.name,
            specie: req.body.specie || "unknown",
            breed: req.body.breed || "unknown",
            gender: req.body.gender || "unknown",
            size: req.body.size || "unknown",
            yearBorn: req.body.yearBorn || "unknown",
            age: req.body.age || "unknown",
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
                        message: "UserDetail not found with id " + req.params.animalId
                    })
                }
                console.log("UPDATED ", animal)
                res.send(animal)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "UserDetail not found with id " + req.params.animalId
                    })
                }
                return res.status(500).send({
                    message: "Error updating animal with id " + req.params.animalId
                })
            })
    },

    delete: async (req, res) => {
        let id = req.params.animalId

        await Animal.findByIdAndDelete(id)
            .then(animal => {
                console.log(animal)
                if (!animal) {
                    return res.status(404).send({
                        message: 'Animal not found with id ' + id
                    })
                }
                res.send({ message: 'Animal deleted successfully!' })

            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Animal not found with id " + id
                    })
                }
                console.log("Error in delete animal ", err.message)
                return res.status(500).send({
                    message: "Could not delete animal with id " + id
                })
            })
    },

    filter: async (req, res) => {
        let query = {}

        if (req.query.city !== undefined && req.query.city !== '' && req.query.city !== null) {
            query.city = req.query.city
        }

        if (req.query.province !== undefined && req.query.province !== '' && req.query.province !== null && req.query.province !== "-1") {
            query.province = req.query.province
        }

        if (req.query.region !== undefined && req.query.region !== '' && req.query.region !== null && req.query.region !== "-1") {
            query.region = req.query.region
        }

        if (req.query.size !== undefined && req.query.size !== '' && req.query.size !== null && req.query.size !== "-1") {
            query.size = req.query.size
        }

        if (req.query.gender !== undefined && req.query.gender !== '' && req.query.gender !== null && req.query.gender !== "-1") {
            query.gender = req.query.gender
        }

        if (req.query.specie !== undefined && req.query.specie !== '' && req.query.specie !== null && req.query.specie !== "-1") {
            query.specie = req.query.specie
        }

        if (req.query.age !== undefined && req.query.age !== '' && req.query.age !== null && req.query.age !== "-1") {
            query.age = req.query.age
        }

        if (req.query.castrated !== undefined && req.query.castrated !== '' && req.query.castrated !== null && req.query.castrated !== "-1") {
            query.castrated = req.query.castrated
        }

        if (req.query.vaccinated !== undefined && req.query.vaccinated !== '' && req.query.vaccinated !== null && req.query.vaccinated !== "-1") {
            query.vaccinated = req.query.vaccinated
        }

        if (req.query.alongWithDogs !== undefined && req.query.alongWithDogs !== '' && req.query.alongWithDogs !== null && req.query.alongWithDogs !== "-1") {
            query.alongWithDogs = req.query.alongWithDogs
        }

        if (req.query.alongWithCats !== undefined && req.query.alongWithCats !== '' && req.query.alongWithCats !== null && req.query.alongWithCats !== "-1") {
            query.alongWithCats = req.query.alongWithCats
        }

        if (req.query.alongWithKids !== undefined && req.query.alongWithKids !== '' && req.query.alongWithKids !== null && req.query.alongWithKids !== "-1") {
            query.alongWithKids = req.query.alongWithKids
        }
        //TODO add birthdate and owner?


        const ORDER_DESC_BY_DATE = -1

        await Animal.find(query).sort({ 'updatedAt': ORDER_DESC_BY_DATE })
            .then(animals => {
                res.send(animals)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving animals."
                })
            })


    }
}
