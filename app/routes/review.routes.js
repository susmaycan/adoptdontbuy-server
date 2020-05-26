module.exports = (app) => {
    const reviews = require('../controllers/review.controller');

    app.post('/review', reviews.create);

    app.get('/review', reviews.findAll);

    app.get('/review/:reviewId', reviews.findOne);

     app.put('/review/:reviewId', reviews.update);

     app.delete('/review/:reviewId', reviews.delete);
}
