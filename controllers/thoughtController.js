const { User, Thought, Reaction } = require('../models');

const thoughtController = {

// #############################
// /api/thoughts/
// #############################

// -----------------------------
// GET /thoughts
// -----------------------------
getAllThoughts(req, res) {
    //will find all thoughts
    Thought.find({})
    //sort in descending order; oldest posts first
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
},

// -----------------------------
// GET /thoughts/:id
// -----------------------------
getThoughtById({ params }, res) {
    //find one with _id that matches request parameter 
    Thought.findOne({ _id: params.id })
    //checks if the thought id exists, otherwise it throws an error
    .then((dbThoughtData) => {
        if(!dbThoughtData) {
            res.status(404).json({ message: "No thoughts with this ID found"});
            return;
        }
        //prints info given from thoughtdata
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
},

// -----------------------------
// POST /thoughts/
// -----------------------------
createThought({ body }, res) {
    //create a new Thought model using request body
    Thought.create(body)
    .then(dbThoughtData => {
        User.findOneAndUpdate(
            // find user by id 
            { _id: body.userId },
            // push new thought to user's thoughts field
            { $push: { thoughts: dbThoughtData._id }},
            // return document when applied
            { new : true }
        )
    })
    .catch(err => res.status(400).json(err));
},

// -----------------------------
// PUT /thoughts/:id
// -----------------------------
updateThought( {params, body}, res) {
    Thought.findOneAndUpdate(
        // find thought id by id in params
        { _id: params.id },
        // update with text from body
        body,
        // return document when applied
        { new: true }
    )
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: "No thoughts with this ID found"});
            return;
        }
        //prints info given from thoughtdata
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
},

// -----------------------------
// DELETE /thoughts/:id 
// -----------------------------
deleteThought({ params }, res) {
    // using link params, gets id, and finds thought matching
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
        // update user's owned thought array
        User.findOneAndUpdate(
            //grabs the associated user name from the thought and matches
            { username: dbThoughtData.username },
            //removes the thought with the matching id from params above
            { $pull : { thoughts: params.id }}
        )
        // json to confirm thought deletion
        .then(() => res.json({ message: 'Thought deleted successfully' }))
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
},


// #############################
// /api/thoughts/:thoughtid/reactions
// #############################

// -----------------------------
// POST /thoughts/:id/reactions
// -----------------------------
addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        // finds thought with id in link params :id        
        { _id: params.thoughtId},
        // adds new reactions field with the body set as reaction text
        { $addToSet: { reactions: body }},
        // return document when applied
        { new: true }
    )
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({ message: "No thoughts with this ID found"});
            return;
        }
        //prints info given from thoughtdata
        res.json(dbThoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
},

//delete a reaction and pull reaction from thought reaction array



}