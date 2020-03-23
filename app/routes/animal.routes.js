module.exports = (app) => {
    const animals = require('../controllers/animal.controller.js');

    // Create a new animal
    app.post('/animal', animals.create);

    // Retrieve all animals
    app.get('/animal', animals.findAll);

    // Retrieve latest animals
    app.get('/animal/latest', animals.retrieveLatestAnimals);

    // Retrieve an animal by its id
    app.get('/animal/:animalId', animals.findOne);

    // Update an animal
    app.put('/animal/:animalId', animals.update);

    // Delete an animal
    app.delete('/animal/:animalId', animals.delete);

    //Filter all animals
    app.get('/search', animals.filter);
}