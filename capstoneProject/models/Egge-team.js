/**
	Title: Egge-team.js
    Author: William Egge
    Date: 14 may 2023
    Description: This code defines and exports a Mongoose model named "Team" with a schema containing "name", "mascot", and "players" properties, for use in a database.
 */

// require statements
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// create the player schema
const playerSchema = new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  });
  
// create the team schema
  const teamSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    mascot: {
      type: String,
      required: true,
    },
    players: [playerSchema],
  });

// create a model
module.exports = mongoose.model("Team", teamSchema);
