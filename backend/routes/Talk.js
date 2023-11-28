const express = require('express');
const router = express.Router();
const Talk = require('../models/Talk.model.js');

// Route to get all talks
router.get('/', async (req, res) => {
  try {
    const talks = await Talk.find();
    res.json(talks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new talk
router.post('/', async (req, res) => {
  const talk = new Talk({
    name: req.body.name,
    Email: req.body.Email,
    message: req.body.message,
  });

  try {
    const newTalk = await talk.save();
    res.status(201).json(newTalk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a specific talk by ID
router.get('/:id', getTalk, (req, res) => {
  res.json(res.talk);
});

// Middleware to get a specific talk by ID
async function getTalk(req, res, next) {
  let talk;
  try {
    talk = await Talk.findById(req.params.id);
    if (talk == null) {
      return res.status(404).json({ message: 'Talk not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.talk = talk;
  next();
}

// Route to update a talk by ID
router.patch('/:id', getTalk, async (req, res) => {
  if (req.body.name != null) {
    res.talk.name = req.body.name;
  }
  if (req.body.Email != null) {
    res.talk.Email = req.body.Email;
  }
  if (req.body.message != null) {
    res.talk.message = req.body.message;
  }

  try {
    const updatedTalk = await res.talk.save();
    res.json(updatedTalk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a talk by ID
router.delete('/:id', getTalk, async (req, res) => {
  try {
    await res.talk.remove();
    res.json({ message: 'Talk deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
