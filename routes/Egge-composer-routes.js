/**
	Title: Egge-composer-routes.js
    Author: William Egge
    Date: 7 May 2023
    Description: This code creates an Express router to handle HTTP requests for managing composer data, providing endpoints to retrieve all composers, retrieve a composer by ID, and create a new composer in a MongoDB database.
 */

// import statements
const express = require("express");
const router = express.Router();
const Composer = require("../models/Egge-composer");

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *  get:
 *   tags:
 *    - Composers
 *   summary: returns a list of composer documents
 *   description: API for returning a list of composers from MongoDB Atlas
 *   responses:
 *    '200':
 *      description: Composer documents
 *    '500':
 *      description: Server Exception
 *    '501':
 *      description: MongoDB Exception
 */
router.get("/composers", async (req, res) => {
  try {
    Composer.find({}, (err, composers) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(composers);
        res.json(composers);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Exception", error });
  }
});

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *  get:
 *   tags:
 *    - Composers
 *   summary: returns a composer document by ID
 *   description: API for returning a composer document by ID from MongoDB Atlas
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: The composer ID requested by the client
 *      schema:
 *        type: string
 *   responses:
 *    '200':
 *      description: Composer document in JSON format
 *    '500':
 *      description: Server Exception
 *    '501':
 *      description: MongoDB Exception
 */
router.get("/composers/:id", async (req, res) => {
  try {
    Composer.findOne({"_id": req.params.id}, (err, composer) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception:",
          err,
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "MongoDB Exception:", error });
  }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *  post:
 *   tags:
 *    - Composers
 *   summary: creates a new composer document
 *   description: API for creating a new composer document in MongoDB Atlas
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *   responses:
 *    '200':
 *      description: Composer document.
 *    '500':
 *      description: Server Exception.
 *    '501':
 *      description: MongoDB Exception.
 */
router.post("/composers", async (req, res) => {
  try {
    const composer = new Composer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    await composer.save((err, composer) => {
      if (err) {
        res.status(501).json({ message: "MongoDB Exception", err });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Server Exception", error });
  }
});

/**
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *  put:
 *   tags:
 *    - Composers
 *   summary: updates a composer document by ID
 *   description: API for updating a composer document by ID in MongoDB Atlas
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: The composer ID requested by the client
 *      schema:
 *        type: string
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *   responses:
 *    '200':
 *      description: Array of composer documents.
 *    '401':
 *      description: Invalid composerId.
 *    '500':
 *      description: Server Exception.
 *    '501':
 *      description: MongoDB Exception.
 */
router.put("/composers/:id", async (req, res) => {
  try {
    Composer.findOne({"_id": req.params.id}, (err, composer) => {
      if (err) {
        console.log("Error in findOne: ", err); // Added log statement
        res.status(501).send({ message: "MongoDB Exception: findOne", err });
      } else if (composer) {
        composer.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        composer.save((err, savedComposer) => {
          if (err) {
            console.log("Error in save: ", err); // Added log statement
            res.status(501).send({ message: "MongoDB Exception: save", err });
          } else {
            res.json(savedComposer);
          }
        });
      } else {
        res.status(401).send({ message: "Invalid composerId" });
      }
    });
  } catch (error) {
    console.log("Error in catch block: ", error); // Added log statement
    res.status(500).send({ message: "Server Exception:", error });
  }
});


/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *  delete:
 *   tags:
 *    - Composers
 *   summary: deletes a composer document by ID
 *   description: API for deleting a composer document by ID from MongoDB Atlas
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: The composer ID requested by the client
 *      schema:
 *        type: string
 *   responses:
 *    '200':
 *      description: Composer document
 *    '500':
 *      description: Server Exception
 *    '501':
 *      description: MongoDB Exception
 */
router.delete("/composers/:id", async (req, res) => {
  try {
    Composer.findByIdAndDelete({"_id": req.params.id }, (err, deletedComposer) => {
      if (err) {
        res.status(501).send({ message: "MongoDB Exception:", err });
      } else {
        res.json(deletedComposer);
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Server Exception:", error });
  }
});

// export the router
module.exports = router;
