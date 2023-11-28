const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher.model');

// Create a new Teacher
router.post('/', async (req, res) => {
  try {
    const newTeacher = await Teacher.create(req.body);
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a list of all Teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('products').populate('user');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all Teachers
router.get('/', async (req, res) => {
  try {
    // Assuming you have a way to identify the current user, e.g., through authentication
    // You can filter teachers by the user's ID
    const teachers = await Teacher.find({ user: req.user._id }).populate('products user');
    
    // Extract and return the products from the teachers
    const productsList = teachers.map((teacher) => teacher.products).flat();
    
    res.status(200).json(productsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Teacher by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      res.status(200).json(updatedTeacher);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Teacher by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndRemove(req.params.id);
    if (!deletedTeacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:teacherId/:productId', async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const productId = req.params.productId;

    // Remove the product ID from the teacher's products array
    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { $pull: { products: productId } },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    return res.json(teacher);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
