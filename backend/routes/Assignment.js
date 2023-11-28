const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const cors = require('cors'); 

router.use(cors());

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const fileDirectory = 'public/images';

// works
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const assignmentName = req.body.name || req.file.originalname;

    // Create a new assignment using your Mongoose model
    const newAssignment = new Assignment({
      name: assignmentName,
      file: req.file.filename,
      user: req.body.user,
      products: req.body.products
    });

    newAssignment.save((err, assignment) => {
      if (err) {
        return res.status(500).json({ error: 'File upload failed' });
      }
      res.json(assignment);
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

// //works
// router.get('/download/:assignmentId', (req, res) => {

//   Assignment.findById(req.params.assignmentId, (err, assignment) => {
//     if (err) {
//       return res.status(500).json({ error: 'File download failed' });
//     }

//     if (!assignment) {
//       return res.status(404).json({ error: 'Assignment not found' });
//     }

//     // Construct the file path
//     const filePath = `public/images/${assignment.file}`;

//     // Stream the file for download
//     const fileStream = fs.createReadStream(filePath);
//     res.setHeader('Content-Disposition', `attachment; filename="${assignment.name}"`);
//     fileStream.pipe(res);
//   });
// });

router.get('/download/:assignmentId', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId)
      .populate('user','fullname', 'products','name') // Populate the 'user' field and specify 'fullname'
      .exec();

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Construct the file path
    const filePath = `public/images/${assignment.file}`;

    // Stream the file for download
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${assignment.name}"`);
    fileStream.pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'File download failed' });
  }
});

// works
router.get('/get', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// works
router.get('/get/:Id', async (req, res) => {
  const Id = req.params.Id;

  try {
    const assignment = await Assignment.findById(Id); // Use findById to find by ObjectID
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Internal server error while fetching assignment' });
  }
});


module.exports = router;
