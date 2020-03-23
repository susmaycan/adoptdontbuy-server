module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const reviews = require('../controllers/review.controller');
    // Create a new Note
    app.post('/user', users.create);

    // Retrieve all Notes
    app.get('/user', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/user/:userId', users.findOne);

    // Retrieve all animals by user
    app.get('/user/:userId/animal', users.animalByUser);

    // Retrieve all reviews by user
    app.get('/user/:userId/review', reviews.findAll);

    // Update a Note with noteId
    app.put('/user/:userId', users.update);

    // Delete a Note with noteId
    app.delete('/user/:userId', users.delete);
}