module.exports = (app) => {
    const animals = require('../controllers/animal.controller.js')

    app.post('/animal', animals.create)

    app.get('/animal', animals.findAll)

    app.get('/animal/:animalId', animals.findOne)

    app.put('/animal/:animalId', animals.update)

    app.delete('/animal/:animalId', animals.delete)

    app.get('/search', animals.filter)
}
