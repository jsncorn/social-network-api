const {
    User,
    Thought,
    Reaction
} = require('../models');

const userController = {

    // ############################################# //
    // /api/users/                                   //
    // ############################################# //

    // --------------------------------------------- //
    // GET /users                                    //
    // --------------------------------------------- //
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

    // --------------------------------------------- //
    // GET /users/:id                                //
    // --------------------------------------------- //
    getUserById({
        params
    }, res) {
        User.findOne({
                _id: params.id
            })
            // returns json info on the fields thoughts and friends
            .populate('_id', 'thoughts friends')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: "No users found with this ID"
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // --------------------------------------------- //
    // POST /users                                   //
    // --------------------------------------------- //  
    createUser({
        body
    }, res) {
        // create a new user object with information from the req body object
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    // --------------------------------------------- //
    // PUT /users/:id                                //
    // --------------------------------------------- //
    updateUser({
        params,
        body
    }, res) {
        User.findOneAndUpdate(
                // finds by id given in the link
                {
                    _id: params.id
                },
                // posts with info given by the json req
                body,
                // returns page when applied
                {
                    new: true, runValidators: true
                }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: "No users found with this ID"
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // --------------------------------------------- //
    // DELETE /users/:id                             //
    // --------------------------------------------- //    
    deleteUser({
        params
    }, res) {
        // finds a user by parameters given in the link and then deletes it
        User.findOneAndDelete({
                _id: params.id
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: "No users found with this ID"
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // ############################################# //
    // /api/users/:userid/friends/:friendid          //
    // ############################################# //

    // --------------------------------------------- //
    // POST /api/users/:userid/friends/:friendid     //
    // --------------------------------------------- //
    addFriend({
        params
    }, res) {
        User.findOneAndUpdate(
                // find user by userid defined by params
                {
                    _id: params.userId
                },
                // add the friend defined by params to user's friends array
                {
                    $addToSet: {
                        friends: params.friendId
                    }
                },
                // return when applied
                {
                    new: true, runValidators: true
                }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: "No users found with this ID"
                    });
                    return;
                }
                User.findOneAndUpdate(
                        // find friend from params 
                        {
                            _id: params.friendId
                        },
                        // add user to their friend's friends list
                        {
                            $addToSet: {
                                friends: params.userId
                            }
                        },
                        // return wehn applied
                        {
                            new: true, runValidators: true
                        }
                    )
                    .then(dbFriendData => {
                        if (!dbFriendData) {
                            res.status(404).json({
                                message: "No users found with this ID"
                            });
                            return;
                        }
                        res.json(dbFriendData);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // --------------------------------------------- //
    // DELETE /api/users/:userid/friends/:friendid   //
    // --------------------------------------------- //
    deleteFriend({
        params
    }, res) {
        User.findOneAndUpdate(
                // find by params id
                {
                    _id: params.userId
                },
                // pull or remove friend id from user id's friends array
                {
                    $pull: {
                        friends: params.friendId
                    }
                },
                // return when applied
                {
                    new: true, runValidators: true
                }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: "No users found with this ID"
                    });
                    return;
                }
                User.findOneAndUpdate(
                        // find friend by friend id from params
                        {
                            _id: params.friendId
                        },
                        // remove user from friend friend's list 
                        {
                            $pull: {
                                friends: params.userId
                            }
                        },
                        // return when applied
                        {
                            new: true, runValidators: true
                        }
                    )
                    .then(dbFriendData => {
                        if (!dbFriendData) {
                            res.status(404).json({
                                message: "No users found with this ID"
                            });
                            return;
                        }
                        res.json(dbFriendData);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports = userController;