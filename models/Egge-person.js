/**
	Title: Egge-composer.js
    Author: William Egge
    Date: 16 April 2023
    Description: This code defines and exports a Mongoose model named "Composer" with a schema containing "firstName" and "lastName" properties, for use in a database.
    referenced work: https://github.com/chrisgorham999/web-420/blob/main/models/gorham-person.js
 */

// require statements
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// create a new schema and define the role schema
const roleSchema = new Schema({
  text: { type: String },
});

// create a new schema and define the dependent schema
let dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
});

// create a new schema and define the person schema
let personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String },
});

// create a model
module.exports = mongoose.model("Person", personSchema, "eggePersons");
