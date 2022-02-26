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
    
    // -----------------------------
    // PUT /users/:id
    // -----------------------------

    // -----------------------------
    // DELETE /users/:id
    // -----------------------------    




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