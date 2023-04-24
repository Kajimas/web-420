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
