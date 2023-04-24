/**
	Title: Egge-composer.js
    Author: William Egge
    Date: 23 April 2023
    Description: This code defines and exports a Mongoose model named "User" with a schema containing "userName", "password", and "emailAddress" properties, for use in a database.
    referenced work: N/A
 */

// Import the necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String
  },
  password: {
    type: String
  },
  emailAddress: {
    type: Array,
    required: true
  }
});


// Define and export the model
module.exports = mongoose.model('User', userSchema);
