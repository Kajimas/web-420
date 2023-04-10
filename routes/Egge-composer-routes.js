const express = require('express');
const router = express.Router();
const Composer = require('./models/yourLastName-composer');

// findAllComposers
/**
 * @openapi
 * /api/composers:
 *   get:
 *     summary: Retrieve an array of composer documents.
 *     responses:
 *       200:
 *         description: Array of composer documents.
 *       500:
 *         description: Server Exception.
 *       501:
 *         description: MongoDB Exception.
 */
router.get('/api/composers', async (req, res) => {
  try {
    const composers = await Composer.find();
    res.status(200).json(composers);
  } catch (error) {
    res.status(501).json({ message: 'MongoDB Exception', error });
  }
});

// findComposerById
/**
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     summary: Retrieve a composer document by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Composer document.
 *       500:
 *         description: Server Exception.
 *       501:
 *         description: MongoDB Exception.
 */
router.get('/api/composers/:id', async (req, res) => {
  try {
    const composer = await Composer.findOne({ _id: req.params.id });
    res.status(200).json(composer);
  } catch (error) {
    res.status(501).json({ message: 'MongoDB Exception', error });
  }
});

// createComposer
/**
 * @openapi
 * /api/composers:
 *   post:
 *     summary: Create a new composer.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Composer document.
 *       500:
 *         description: Server Exception.
 *       501:
 *         description: MongoDB Exception.
 */
router.post('/api/composers', async (req, res) => {
  try {
    const composer = new Composer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    await composer.save();
    res.status(200).json(composer);
  } catch (error) {
    res.status(501).json({ message: 'MongoDB Exception', error });
  }
});

module.exports = router;
