module.exports = (app) => {
    const reviews = require('../controllers/review.controller');
    
    // Create a new review
    app.post('/review', reviews.create);

    // Retrieve all reviews
    app.get('/review', reviews.findAll);

    // Retrieve one review
    app.get('/review/:reviewId', reviews.findOne);

     // Update a Note with noteId
     app.put('/review/:reviewId', reviews.update);

     // Delete a Note with noteId
     app.delete('/review/:reviewId', reviews.delete);
}