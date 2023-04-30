/**
	Title: Egge-node-shopper-routes.js
    Author: William Egge
    Date: 30 April 2023
    Description: This code creates an Express router to handle HTTP requests for managing customer data, providing endpoints to retrieve all customers, retrieve a customer by ID, and create a new customer in a MongoDB database.
    Work Refrenced: https://github.com/chrisgorham999/web-420/blob/main/routes/gorham-node-shopper-routes.js
 */

// import statements
const express = require("express");
const router = express.Router();
const Customer = require("../models/Egge-customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Creates a new Customer document
 *     requestBody:
 *       description: Customer Information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };

    await Customer.create(newCustomer, (err, customer) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "MongoDB Exception" + err,
        });
      } else {
        console.log(customer);
        res.json(customer);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Exception", error });
  }
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API for creating a new invoice by username
 *     summary: Create a new invoice by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username that creates a new invoice
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          price:
 *                              type: number
 *                          quantity:
 *                              type: number
 *     responses:
 *       '200':
 *         description: Customer invoice added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers/:username/invoices", async (req, res) => {
  try {
    console.log("Inside createInvoiceByUserName route");

    const userName = req.params.username;
    console.log("userName:", userName);

    const newInvoice = {
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      dateCreated: req.body.dateCreated,
      dateShipped: req.body.dateShipped,
      lineItems: req.body.lineItems,
    };

    console.log("newInvoice:", newInvoice);

    const customer = await Customer.findOne({ userName: userName });
    console.log("customer:", customer);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.invoices.push(newInvoice);
    await customer.save();

    res.status(200).json({ message: "Invoice added to MongoDB" });
  } catch (error) {
    console.log("Error in createInvoiceByUserName route:", error);
    res.status(500).json({ message: "MongoDB Exception", error });
  }
});

/**
 * findALLInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Retrieve all invoices for a customer
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Invoices found and returned
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

router.get("/customers/:username/invoices", async (req, res) => {
  try {
    const username = req.params.username;
    const customer = await Customer.findOne({ userName: username });
    if (customer) {
      res.status(200).json(customer.invoices);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "MongoDB Exception", error });
  }
});

// Export the router
module.exports = router;
