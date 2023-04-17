/**
	Title: Egge-composer.js
    Author: William Egge
    Date: 4 April 2023
    Description: This code defines and exports a Mongoose model named "Composer" with a schema containing "firstName" and "lastName" properties, for use in a database.
 */

// require statements
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// create a new schema
const composerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// create a model
module.exports = mongoose.model("Composer", composerSchema);