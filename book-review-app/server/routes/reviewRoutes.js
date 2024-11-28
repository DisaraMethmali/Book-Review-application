const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a review
// Server-side: Review PUT endpoint
router.put('/:id', async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json(updatedReview);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Route to fetch a review by its ID
router.get('/:id', async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json(review); // Send the review data back as JSON
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle any server errors
    }
  });
// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
