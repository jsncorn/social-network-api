const { User, Thought, Reaction } = require('../models');

const userController = { 

    // #############################
    // /api/users/
    // #############################

    // -----------------------------
    // GET /users
    // -----------------------------
    getAllUsers(req, res) {
        // finds all user models
        User.find({})
        // prints it out in a json format
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    // -----------------------------
    // GET /users/:id
    // -----------------------------
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // returns json info on the fields thoughts and friends
        .populate('_id', 'thoughts friends')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No users found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }) 
    },

    // -----------------------------
    // POST /users
    // -----------------------------  
    createUser({ body }, res) {
        // create a new user object with information from the req body object
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
    },

    // -----------------------------
    // PUT /users/:id
    // -----------------------------
    updateUser({ params, body }, res ){ 
        User.findOneAndUpdate(
            // finds by id given in the link
            { _id: params.id },
            // posts with info given by the json req
            body,
            // returns page when applied
            { new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No users found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }) 
    },

    // -----------------------------
    // DELETE /users/:id
    // -----------------------------    
    deleteUser({ params }, res) {
        // finds a user by parameters given in the link and then deletes it
        User.findOneAndDelete(
            { _id: params.id }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No users found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }) 
    },

    // #############################
    // /api/users/:userid/friends/:friendid
    // #############################

    // -----------------------------
    // POST /api/users/:userid/friends/:friendid
    // -----------------------------

    
    // -----------------------------
    // DELETE /api/users/:userid/friends/:friendid
    // -----------------------------






}