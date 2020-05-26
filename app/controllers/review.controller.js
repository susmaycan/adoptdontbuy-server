const Review = require('../models/Review.js')
const User = require('../models/User')

module.exports = {

    create: async (req, res) => {

        const reviewToSave = new Review(req.body)

        await reviewToSave.save()
            .then(review => {
                const userId = reviewToSave.to
                User.findById(userId)
                    .then(user => {
                        if (!user) {
                            return res.status(404).send({
                                message: "User not found with id " + userId
                            })
                        }
                        user.reviews.push(review)
                        user.save()
                        res.send(review)
                    }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Object id error. User not found with id " + userId
                        })
                    }
                    return res.status(500).send({
                        message: "Error retrieving user with id " + userId
                    })
                })
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the review."
                })
            })
    },

    findAll: async (req, res) => {
        await Review.find()
            .then(reviews => {
                res.send(reviews)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving reviews."
                })
            })
    },

    findOne: async (req, res) => {
        await Review.findById(req.params.reviewId)
            .populate('from')
            .populate('to')
            .then(review => {
                if (!review) {
                    return res.status(404).send({
                        message: "Review not found with id " + req.params.reviewId
                    })
                }
                res.send(review)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Review not found with id " + req.params.reviewId
                    })
                }
                return res.status(500).send({
                    message: "Error retrieving review with id " + req.params.reviewId
                })
            })
    },

    update: async (req, res) => {
        await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true })
            .then(review => {
                if (!review) {
                    return res.status(404).send({
                        message: "Review not found with id " + req.params.reviewId
                    })
                }
                res.send(review)
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Review not found with id " + req.params.reviewId
                    })
                }
                return res.status(500).send({
                    message: "Error updating review with id " + req.params.reviewId
                })
            })
    },

    delete: async (req, res) => {
        var id = req.params.reviewId

        await Review.findByIdAndDelete(id)
            .then(review => {
                if (!review) {
                    return res.status(404).send({
                        message: "Review not found with id " + id
                    })
                }
                res.send({ message: "Review deleted successfully!" })

            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Review not found with id " + id
                    })
                }
                console.log("Error in delete review ", err.message)
                return res.status(500).send({
                    message: "Could not delete review with id " + id
                })
            })
    },

}
