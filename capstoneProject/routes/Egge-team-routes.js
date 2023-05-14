/**
	Title: Egge-team-routes.js
    Author: William Egge
    Date: 14 May 2023
    Description: This code defines and exports the routes for four endpoints for the Team API. The endpoints are: findAllTeams, assignPlayerToTeam, updatePlayer, and deletePlayer. The endpoints are used to retrieve all teams, add a player to a team, update a player, and delete a player, respectively.
 */

// inport statements
const express = require("express");
const router = express.Router();
const Team = require("../models/Egge-team");

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Returns a list of team documents
 *     description: API for returning a list of teams from MongoDB Atlas
 *     responses:
 *       '200':
 *         description: Array of team documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/teams", async (req, res) => {
  try {
    Team.find({}, (err, teams) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(teams);
        res.json(teams);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server Exception", err });
  }
});

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Adds a player to a team
 *     description: API for adding a player to a team in MongoDB Atlas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The team ID requested by the client
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/teams/:id/players", async (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, function (err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception",
        });
      } else {
        console.log(team);
        res.json(team);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Exception",
      err,
    });
  }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Returns a list of player documents by team ID
 *     description: API for returning a list of players by team ID from MongoDB Atlas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The team ID requested by the client
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/teams/:id/players", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      res.status(200).json(team.players);
    } else {
      res.status(401).json({ message: "Invalid teamId" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server Exception", err });
  }
});

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Deletes a team document by ID
 *     description: API for deleting a team by ID from MongoDB Atlas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The team ID requested by the client
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(401).json({ message: "Invalid teamId" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server Exception", err });
  }
});

module.exports = router;
