const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam.model'); // Import your Mongoose model

// Create an exam
router.post('/', async (req, res) => {
    try {
        const exam = new Exam(req.body);
        await exam.save();
        res.status(201).json(exam);
        // res.status(201).json({ _id: exam._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all exams
router.get('/', async (req, res) => {
    try {
        const exams = await Exam.find().populate('product');
        res.json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an exam by ID
router.get('/:id', async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('product');
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an exam by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json(updatedExam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an exam by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedExam = await Exam.findByIdAndRemove(req.params.id);
        if (!deletedExam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;


