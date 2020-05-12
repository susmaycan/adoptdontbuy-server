module.exports = (app) => {
    const users = require('../controllers/user.controller.js')
    const reviews = require('../controllers/review.controller')

    app.post('/user', users.create)

    app.get('/user', users.findAll)

    app.get('/user/:userId', users.findOne)

    app.get('/user/:userId/animal', users.animalByUser)

    app.get('/user/:userId/review', reviews.findAll)

    app.put('/user/:userId', users.update)

    app.post('/user/:userId/favourite/:animalId', users.favourite)

    app.delete('/user/:userId', users.delete)
}
