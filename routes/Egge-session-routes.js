/**
	Title: Egge-session-routes.js
    Author: William Egge
    Date: 23 April 2023
    Description: This code creates an Express router to handle HTTP requests for managing composer data, providing endpoints to retrieve all composers, retrieve a composer by ID, and create a new composer in a MongoDB database.
    referenced work: https://github.com/chrisgorham999/web-420/blob/main/routes/gorham-person-routes.js
 */

// import statements
const express = require("express");
const router = express.Router();
const User = require("../models/Egge-user");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - User
 *     description: API that creates a new user
 *     summary: Creates a new user
 *     requestBody:
 *       description: Creation of user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401': 
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const newRegisteredUser = new User({
        userName: req.body.userName,
        password: hashedPassword,
        emailAddress: req.body.emailAddress,
      });

      const savedUser = await newRegisteredUser.save();
      res.status(200).send("Registered user");
    } else {
      res.status(401).send("Username is already in use");
    }
  } catch (error) {
    res.status(500).send("Server Exception");
  }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     description: API that logs in an existing user
 *     summary: Logs in an existing user
 *     requestBody:
 *       description: Login with user credentials
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401': 
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (user) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (passwordIsValid) {
        res.status(200).send("User logged in");
      } else {
        res.status(401).send("Invalid username and/or password");
      }
    } else {
      res.status(401).send("Invalid username and/or password");
    }
  } catch (error) {
    res.status(500).send("Server Exception");
  }
});

module.exports = router;
