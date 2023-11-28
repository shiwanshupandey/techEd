const express = require('express');
const router = express.Router();
const Result = require('../models/Result.model');


router.post('/', async (req, res) => {
    try {
        const result = new Result(req.body);
        await result.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all exams
router.get('/', async (req, res) => {
    try {
        const result = await Result.find().populate('user').populate({
            path: 'exam',
            populate: {
                path: 'product',
            },
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an exam by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await Result.findById(req.params.id).populate('user').populate({
            path: 'exam',
            populate: {
                path: 'product',
            },
        });
        if (!result) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an exam by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedExam = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExam) {
            return res.status(404).json({ error: 'Results not found' });
        }
        res.json(updatedExam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an exam by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedExam = await Result.findByIdAndRemove(req.params.id);
        if (!deletedExam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;


