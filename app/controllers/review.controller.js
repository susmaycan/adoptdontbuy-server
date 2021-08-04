const Review = require('../models/Review.js')
const User = require('../models/User')
const Helpers = require('../utils/functions')
const { CODE_ERRORS, QUERY, MODEL } = require('../utils/const')

module.exports = {

    create: async (req, res) => {
        try {
            const reviewToSave = new Review(req.body)
            const savedReview = await reviewToSave.save()
            const user = await User.findById(savedReview.to)
            if (user) {
                user.reviews.push(savedReview)
                await user.save()
                res.send(savedReview)
            } else {
                Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message: `User not found with id ${reviewToSave.to}`} )
            }
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error creating the review: ${err.message}`})
        }
    },

    findAll: async (req, res) => {
        try {
            const reviewList = await Review.find()
                .sort({ 'updatedAt': QUERY.ORDER_DESC_BY_DATE })
            res.send(reviewList)
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error retrieving the reviews: ${err.message}`})
        }
    },

    findOne: async (req, res) => {
        try {
            const { reviewId } = req.params
            const review = await Review.findById(reviewId).populate(MODEL.REVIEW.TO).populate(MODEL.REVIEW.FROM)
            if (review) res.send(review)
            else Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`Review with id ${animalId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error retrieving the review: ${err.message}`})
        }
    },

    update: async (req, res) => {
        try {
            const { reviewId } = req.params
            const { review } = req.body
            const findReview = await Review.findByIdAndUpdate(reviewId, review, { new: true })
            if (findReview) res.send(findReview)
            else Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`Review with id ${reviewId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error updating the review: ${err.message}`})
        }
    },

    delete: async (req, res) => {
        try {
            const { reviewId } = req.params
            const deletedReview = await Review.findByIdAndDelete(reviewId)
            if (deletedReview) res.send('Review deleted successfully.')
            else Helpers.sendAPIErrorMessage({ res: res, code: CODE_ERRORS.NOT_FOUND, message:`Review with id ${reviewId} not found.`})
        } catch (err) {
            Helpers.sendAPIErrorMessage({ res: res, code: err.code, message:`Error deleting the review: ${err.message}`})
        }
    },

}
