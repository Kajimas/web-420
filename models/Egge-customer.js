/**
	Title: Egge-customer.js
    Author: William Egge
    Date: 30 April 2023
    Description: This code defines and exports a Mongoose model named "Composer" with a schema containing "firstName" and "lastName" properties, for use in a database.
 */

// require statements
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// create a new schema named "lineItemSchema"
const lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
});

// create a new schema named "invoiceSchema"
const invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
})

// create a new schema named "customerSchema"
const customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
});

// create a model
module.exports = mongoose.model("Customer", customerSchema);