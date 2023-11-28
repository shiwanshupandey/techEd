const express = require('express');
const router = express.Router();
const Review = require('../models/Review.model.js'); 

// Create a new review
router.post('/', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new review' });
  }
});

// Get all reviews with populated products and user
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('product') // Populates the 'product' field
      .populate('user');    // Populates the 'user' field

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
});

// Get a specific review by ID with populated products and user
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('product') // Populates the 'product' field
      .populate('user');    // Populates the 'user' field

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the review' });
  }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the review' });
  }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(204).end(); // No content, successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the review' });
  }
});

module.exports = router;
