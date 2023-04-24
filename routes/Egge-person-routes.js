/**
	Title: Egge-composer-routes.js
    Author: William Egge
    Date: 4 April 2023
    Description: This code creates an Express router to handle HTTP requests for managing composer data, providing endpoints to retrieve all composers, retrieve a composer by ID, and create a new composer in a MongoDB database.
    referenced work: N/A
 */

// import statements
const express = require("express");
const router = express.Router();
const Person = require("../models/Egge-person");

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     summary: Returns a list of Person documents
 *     description: API for returning a list of Persons from MongoDB Atlas
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/persons", async (req, res) => {
  try {
    Person.find({}, function (err, persons) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(persons);
        res.json(persons);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server Exception:",
      error,
    });
  }
});

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     summary: Creates a new Person document
 *     description: API for creating a new Person document in MongoDB Atlas
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/persons", async (req, res) => {
  try {
    const newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    };

    await Person.create(newPerson, function (err, person) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(person);
        res.json(person);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server Exception:",
      error,
    });
  }
});

// exports the router
module.exports = router;
