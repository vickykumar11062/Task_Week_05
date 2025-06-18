const express = require('express');
const router = express.Router();
const Alien = require('../models/alien'); // Import the Alien model

router.get('/', async (req, res) => {
  try {
    const aliens = await Alien.find(); // Fetch all aliens from the database
    res.json(aliens); // Send the aliens as a JSON response
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
});

router.get('/:id', async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id); // Fetch all aliens from the database
    res.json(alien); // Send the aliens as a JSON response
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
});

router.post('/', async (req, res) => {
  const alien = new Alien({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub
  })

  try {
    const a1 = await alien.save()
    res.json(a1); // Send the saved alien as a JSON response
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id)
    alien.sub = req.body.sub; // Update the 'sub' field of the alien
    const a1 = await alien.save(); // Save the updated alien
    res.json(a1); // Send the updated alien as a JSON response
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }  
});

router.delete('/:id', async (req, res) => {
  try {
    const alien = await Alien.findByIdAndDelete(req.params.id); // Find and delete by ID
    if (!alien) {
      return res.status(404).send('Alien not found'); // If not found, return 404
    }
    res.json({ message: 'Alien deleted successfully', deletedAlien: alien }); // Confirmation response
  } catch (err) {
    res.status(500).send(err.message); // Handle errors
  }
});


module.exports = router;