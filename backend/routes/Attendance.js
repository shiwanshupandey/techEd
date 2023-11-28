const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance.model'); // Update the path as needed

router.post('/', async (req, res) => {
  try {
    const { date, products, Present } = req.body;

    const attendance = new Attendance({ date, products, Present });
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attendance record', details: error.message });
  }
});


  
  router.get('/', async (req, res) => {
    try {
      const attendanceRecords = await Attendance.find().populate('products').populate('Present');
      res.json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
  });

  
  router.get('/:id', async (req, res) => {
    try {
      const attendanceRecord = await Attendance.findById(req.params.id).populate('Present').populate('products');
      if (!attendanceRecord) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }
      res.json(attendanceRecord);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch attendance record' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const {  date, products, Present} = req.body;
      const updatedAttendance = await Attendance.findByIdAndUpdate(
        req.params.id,
        { date, products,Present},
        { new: true }
      );
      if (!updatedAttendance) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }
      res.json(updatedAttendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update attendance record' });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const deletedAttendance = await Attendance.findByIdAndRemove(req.params.id);
      if (!deletedAttendance) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }
      res.json(deletedAttendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete attendance record' });
    }
  });


router.get('/byDate/:date', async (req, res) => {
    try {
      const date = req.params.date;
      const attendanceRecords = await Attendance.find({ date: date });
      res.json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch attendance records by date' });
    }
  });



  router.delete('/:attendanceId/:userId', async (req, res) => {
    try {
      const { attendanceId, userId } = req.params;
  
      // Find the attendance record by ID
      const attendanceRecord = await Attendance.findById(attendanceId);
  
      if (!attendanceRecord) {
        return res.status(404).json({ error: 'Attendance record not found' });
      }
  
      // Remove the user with the specified ID from the 'Present' array
      attendanceRecord.Present = attendanceRecord.Present.filter((user) => user._id.toString() !== userId);
  
      // Save the updated attendance record
      const updatedAttendance = await attendanceRecord.save();
  
      res.json(updatedAttendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove user from attendance record', details: error.message });
    }
  });
  
  

  module.exports = router;


