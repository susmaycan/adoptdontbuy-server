const User = require('../models/User.js');
const Animal = require('../models/Animal.js');

// Create and Save a new user
module.exports = {

    create: async (req, res) => {
        if (!req.body._id) {
            return res.status(400).send({
                message: "User's _id can not be empty"
            });
        }

        if (!req.body.email) {
            return res.status(400).send({
                message: "User's email can not be empty"
            });
        }

        if (!req.body.username) {
            return res.status(400).send({
                message: "User's username can not be empty"
            });
        }


        const user = new User({
            _id: req.body._id,
            phone: req.body.phone || "unknown",
            animal_shelter: req.body.animal_shelter || false,
            website: req.body.website || "https://www.unknown.es",
            address_line: req.body.address_line || "unknown",
            country: req.body.country || "Spain",
            region: req.body.region || "unknown",
            province: req.body.province || "unknown",
            city: req.body.city || "unknown",
            picture: req.body.picture || "unknown",
            description: req.body.description || "unknown",
            first_name: req.body.first_name || "unknown",
            last_name: req.body.last_name || "unknown",
            email: req.body.email,
            username: req.body.username,
            inAdoption: req.body.inAdoption || [],
            likedAnimals: req.body.likedAnimals || [],
            adoptedByOthers: req.body.adoptedByOthers || [],
            reserved: req.body.reserved || [],
            adoptedByMe: req.body.adoptedByMe || [],
            favourites: req.body.favourites || [],
            reviews: req.body.reviews || []

        });

        await user.save()
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
    },

    // Retrieve and return all users from the database.
    animalByUser: async (req, res) => {
        try {
            await User.findById(req.params.userId)
                .populate('inAdoption')
                .populate('adoptedByOthers')
                .populate('reserved')
                .populate('favourites')
                .populate('adoptedByMe')
                .then(user => {
                    switch(req.query.type) {
                        case 'inAdoption':
                            res.send(user.inAdoption)
                            break
                        case 'adoptedByOthers':
                            res.send(user.adoptedByOthers)
                            break
                        case 'reserved':
                            res.send(user.reserved)
                            break
                        case 'favourites':
                            res.send(user.favourites)
                            break
                        case 'adoptedByMe':
                            res.send(user.adoptedByMe)
                          break
                        default:
                            res.send({
                                "inAdoption": user.inAdoption,
                                "favourites": user.favourites
                            })
                      }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while animal's retrieving users."
                    });
                });
        } catch (err) {
            console.log("Some error occurred while retrieving animal's users: ", err.message)
            res.status(500).send(err);
        }
    },

    animalsAdoptedByOthers: async (req, res) => {
        try {
            await User.findById(req.params.userId).populate('adoptedByOthers')
                .then(users => {
                    res.send(users.animals)
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while animal's retrieving users."
                    });
                });
        } catch (err) {
            console.log("Some error occurred while retrieving animal's users: ", err.message)
            res.status(500).send(err);
        }
    },

    // Retrieve and return all users from the database.
    findAll: async (req, res) => {
        await User.find()
            .then(users => {
                res.send(users);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
    },

    // Find a single user with a userId
    findOne: async (req, res) => {
        let id = req;
        if (req.params !== undefined) {
            id = req.params.userId;
        }
        await User.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + id
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving user with id " + id
                });
            });
    },

    // Update a user identified by the userId in the request
    update: async (req, res) => {
        // Validate Request
        if (!req.body._id) {
            return res.status(400).send({
                message: "User's _id can not be empty"
            });
        }

        if (!req.body.email) {
            return res.status(400).send({
                message: "User's email can not be empty"
            });
        }

        if (!req.body.username) {
            return res.status(400).send({
                message: "User's username can not be empty"
            });
        }

        // Find user and update it with the request body
        await User.findByIdAndUpdate(req.params.userId, {
            _id: req.body._id,
            phone: req.body.phone || "unknown",
            animal_shelter: req.body.animal_shelter || false,
            website: req.body.website || "unknown",
            address_line: req.body.address_line || "unknown",
            country: req.body.country || "Spain",
            region: req.body.region || "unknown",
            province: req.body.province || "unknown",
            city: req.body.city || "unknown",
            picture: req.body.picture || "unknown",
            description: req.body.description || "unknown",
            first_name: req.body.first_name || "unknown",
            last_name: req.body.last_name || "unknown",
            email: req.body.email,
            username: req.body.username,
            inAdoption: req.body.inAdoption || [],
            likedAnimals: req.body.likedAnimals || [],
            adoptedByOthers: req.body.adoptedByOthers || [],
            reserved: req.body.reserved || [],
            adoptedByMe: req.body.adoptedByMe || [],
            favourites: req.body.favourites || [],
            reviews: req.body.reviews || []

        }, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                return res.status(500).send({
                    message: "Error updating user with id " + req.params.userId
                });
            });
    },

    // Delete a user with the specified userId in the request
    delete: async (req, res) => {
        var userToDelete = null;

        //We delete the user
        await User.findByIdAndDelete(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                userToDelete = user;
                res.send({ message: "User deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.userId
                    });
                }
                console.log("Error in delete user: ", err.message);
                return res.status(500).send({
                    message: "Could not delete user with id " + req.params.userId
                });
            });

        //We delete the user's animals if we deleted the user correctly
        if (res.statusCode === 200) {
            for (const animal of userToDelete.animals) {
                const id = animal;
                await Animal.findByIdAndRemove(id)
                    .then(animalToDelete => {
                        if (!animalToDelete) {
                            return res.status(404).send({
                                message: "UserDetail not found with id " + id
                            });
                        }
                    }).catch(err => {
                        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                            return res.status(404).send({
                                message: "UserDetail not found with id " + id
                            });
                        }
                        console.log("Error in delete animal ", err.message);
                        return res.status(500).send({
                            message: "Could not delete animal with id " + id
                        });
                    });
            }
        }
    }
}
