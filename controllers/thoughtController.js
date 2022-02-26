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
}

// -----------------------------
// GET /thoughts/:id
// -----------------------------




//post a new thought and push created thought id to
//associated user's thougths array field


// #############################
// /api/thoughts/:thoughtid/reactions
// #############################


//post a reaction and push reaction to thought reaction array

//delete a reaction and pull reaction from thought reaction array



}