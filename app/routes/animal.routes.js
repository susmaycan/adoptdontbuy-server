module.exports = (app) => {
    const animals = require('../controllers/animal.controller.js');

    // Create a new Note
    app.post('/animal', animals.create);

    // Retrieve all Notes
    app.get('/animal', animals.findAll);

    // Retrieve a single Note with noteId
    app.get('/animal/:animalId', animals.findOne);

    // Update a Note with noteId
    app.put('/animal/:animalId', animals.update);

    // Delete a Note with noteId
    app.delete('/animal/:animalId', animals.delete);
}