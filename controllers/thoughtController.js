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


// -----------------------------
// DELETE /thoughts/:id
// -----------------------------



// #############################
// /api/thoughts/:thoughtid/reactions
// #############################


//post a reaction and push reaction to thought reaction array

//delete a reaction and pull reaction from thought reaction array



}