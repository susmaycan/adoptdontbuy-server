const User = require('../models/User.js')
const Animal = require('../models/Animal.js')
const Helpers = require('../utils/functions')
const { CODE_ERRORS, QUERY, MODEL } = require('../utils/const')

module.exports = {
    create: async (req, res) => {
        const user = new User(req.body)
        try {
            let savedUser = await user.save()
            res.send(savedUser)
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error creating the user: ${err.message}`})
        }
    },

    animalByUser: async (req, res) => {
        try {
            const { userId } = req.params
            const { type } = req.query
            const findUser = await User.findById(userId)
                .populate(MODEL.USER.ANIMALS)
                .populate(MODEL.USER.FAVOURITES)
            if (findUser) {
                switch (type) {
                    case QUERY.ANIMALS:
                        res.send(user.animals)
                        break
                    case QUERY.FAVOURITES:
                        res.send(user.favourites)
                        break
                    default:
                        res.send({
                            [QUERY.ANIMALS] : user.animals,
                            [QUERY.FAVOURITES]: user.favourites
                        })
                }
            } else {
                Helpers.sendAPIErrorMessage({
                    res: res,
                    code: CODE_ERRORS.NOT_FOUND,
                    message: `User with id ${userId} not found.`
                })
            }
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error retrieving the user: ${err.message}`})
        }
    },

    favourite: async (req, res) => {
        try {
            const { userId, animalId } = req.params
            const { action } = req.query
            const findUser = await User.findById(userId)
                .populate(MODEL.USER.ANIMALS)
                .populate(MODEL.USER.FAVOURITES)
            if (findUser) {
                if (action === QUERY.DELETE_FAVOURITE_ACTION) {
                    let indexAnimal = findUser.favourites.indexOf((favouriteAnimal) => favouriteAnimal.id === animalId)
                    if (indexAnimal > -1){
                        findUser.favourites.splice(indexAnimal, 1)
                    }
                } else {
                    findUser.favourites.push(animalId)
                }

                const savedUser = await findUser.save()
                res.send(savedUser)

            } else {
                Helpers.sendAPIErrorMessage({
                    res: res,
                    code: CODE_ERRORS.NOT_FOUND,
                    message: `User with id ${userId} not found.`
                })
            }
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error adding/deleting favourites from user: ${err.message}`})
        }
    },

    findAll: async (req, res) => {
        try {
            const users = await User.find()
            res.send(users)
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error retrieving the users: ${err.message}`})
        }
    },

    findOne: async (req, res) => {
        try {
            const { userId } = req.params
            const review = await User.findById(userId)
                .populate(MODEL.USER.ANIMALS)
                .populate(MODEL.USER.FAVOURITES)
                .populate({
                    path : MODEL.USER.REVIEWS,
                    populate : {
                        path : MODEL.REVIEW.FROM,
                        select: `${MODEL.USER.USERNAME} ${MODEL.USER.PICTURE}`
                    }})
            if (review) res.send(review)
            else Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`User with id ${userId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error retrieving the user: ${err.message}`})
        }
    },

    update: async (req, res) => {
        try {
            const { userId } = req.params
            const { user } = req.body
            const findUser = await User.findByIdAndUpdate(userId, user, { new: true })
            if (findUser) res.send(findUser)
            else Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`User with id ${userId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error updating the user: ${err.message}`})
        }
    },

    delete: async (req, res) => {
        try {
            const { userId } = req.params
            const deletedUser = await User.findByIdAndDelete(userId)
            if (deletedUser) {
                for (const animalId of deletedUser.animals) {
                    const deletedAnimal = await Animal.findByIdAndRemove(animalId)
                    if (!deletedAnimal) Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`Animal with id ${animalId} not found.`})
                }
                res.send('User deleted successfully.')
            }
            else Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`User with id ${userId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error deleting the animal: ${err.message}`})
        }
    }
}
