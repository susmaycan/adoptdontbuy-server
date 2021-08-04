module.exports = (app) => {
    const users = require('../controllers/user.controller.js')

    app.post('/user', users.create)

    app.get('/user', users.findAll)

    app.get('/user/:userId', users.findOne)

    app.get('/user/:userId/animal', users.animalByUser)

    app.put('/user/:userId', users.update)

    app.post('/user/:userId/favourite/:animalId', users.favourite)

    app.delete('/user/:userId', users.delete)
}
