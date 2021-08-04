const Animal = require('../models/Animal.js')
const User = require('../models/User.js')
const Helpers = require('../utils/functions')
const { CODE_ERRORS, QUERY, ANIMAL_STATUS, MODEL } = require('../utils/const')

module.exports = {

    create: async (req, res) => {
        try {
            const animal = new Animal(req.body)
            const savedAnimal = await animal.save()
            const owner = await User.findById(savedAnimal.owner)
            if (owner) {
                owner.animals.push(animal)
                owner.save()
                res.send(animal)
            }
            Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message: `User not found with id ${animal.owner}`} )
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error creating the animal: ${err.message}`})
        }
    },

    findAll: async (req, res) => {
        try {
            const animals = await Animal.find({status: ANIMAL_STATUS.IN_ADOPTION})
                .sort({ 'updatedAt': QUERY.ORDER_DESC_BY_DATE })
                .limit(QUERY.MAX_NUMBER_OF_ITEMS)
            res.send(animals)
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error retrieving the animals: ${err.message}`})
        }
    },

    findOne: async (req, res) => {
        try {
            const { animalId } = req.params
            const animal = await Animal.findById(animalId).populate(MODEL.ANIMAL.OWNER, `${MODEL.USER.USERNAME} ${MODEL.USER.EMAIL}`)
            if (animal) res.send(animal)
            Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`Animal with id ${animalId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error retrieving the animal: ${err.message}`})
        }

    },

    update: async (req, res) => {
        try {
            const { animalId } = req.params
            const { animal } = req.body
            const findAnimal = await Animal.findByIdAndUpdate(animalId, animal, { new: true })
                .populate(MODEL.ANIMAL.OWNER, `${MODEL.USER.USERNAME} ${MODEL.USER.EMAIL}`)
            if (findAnimal) res.send(animal)
            Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`Animal with id ${animalId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error updating the animal: ${err.message}`})
        }
    },

    delete: async (req, res) => {
        try {
            const { animalId } = req.params
            const deletedAnimal = await Animal.findByIdAndDelete(animalId)
            if (deletedAnimal) res.send('Animal deleted successfully.')
            Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`Animal with id ${animalId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error deleting the animal: ${err.message}`})
        }
    },

    filter: async (req, res) => {
        try {
            let query = req.query
            const animals =  await Animal.find({ ...query, status: ANIMAL_STATUS.IN_ADOPTION })
                .sort({ 'updatedAt': QUERY.ORDER_DESC_BY_DATE })
            res.send(animals)
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error filtering the animals: ${err.message}`})
        }
    }
}
