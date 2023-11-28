const router = require('express').Router();
const auth = require('../middleware/auth');
const Products = require('../models/Products.model');
const path = require('path');
const fs = require('fs');
const express = require('express');


router.get('/categories', async (req, res) => {
  try {
    const products = await Products.find().populate('creator');
    const categories = Array.from(new Set(products.map(product => product.category)));
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.route('/create').post((req, res, next) => {
    productsSchema.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        console.log(data)
        res.json(data)
      }
    })
  })


  router.route('/edit/:id').get((req, res) => {
    productsSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        console.log(data)
        res.json(data)
      }
    })
  })

  router.post('/upload/:Id', async (req, res) => {
    try {
      const Id = req.params.Id;
      const product = await Products.findById(Id);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      if (!req.files || !req.files.upload) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const uploadedFile = req.files.upload;
      const fileData = uploadedFile.data; // The file's binary data
      const fileMimeType = uploadedFile.mimetype; // The file's MIME type
  
      // Save the file data to the assignment.upload field
      product.assignment.upload = {
        data: fileData,
        contentType: fileMimeType,
        filename: uploadedFile.name,
      };
  
      // Save the product with the updated assignment.upload field
      await product.save();
  
      res.json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/add', async (req, res) => {
  const products = new Products(req.body);
  try {
    await products.save(); // Corrected to save the product
    //res.status(201).json(products); // Send 201 status for successful creation
    res.status(201).json({
      status: 'Success',
      message: 'Product created successfully',
      _id: products._id,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message // Send the error message
    });
  }
});


router.get('/get', async (req, res) => {
  try {
    // Assuming you have a model named "Products" representing your products
    const products = await Products.find().populate('creator');

 // Retrieve all products
    
    // Check if there are no products found
    if (!products || products.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'No products found',
      });
    }
    
    // Send the products as JSON
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});


router.route('/:id').get((req, res) => {
  Products.findById(req.params.id).populate('creator')
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.get('/:productId/:Id', async (req, res) => {
  try {
    const productId = req.params.productId;
    const Id = req.params.Id;
    
    // Assuming 'syllabus' is an array field within your 'Product' model
    const product = await Products.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Assuming 'syllabus' is the field containing the syllabus data
    const syllabus = product.syllabus;
    
    // Find the specific syllabus item based on syllabusId
    const selectedSyllabusItem = syllabus.find(item => item._id.toString() === Id);
    
    if (!selectedSyllabusItem) {
      return res.status(404).json({ error: 'Syllabus item not found' });
    }
    
    res.json(selectedSyllabusItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/products/:id/syllabus', async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch the syllabus data based on the productId
    const product = await Products.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Assuming 'syllabus' is the field containing the syllabus data
    const syllabus = product.syllabus;
    res.json(syllabus);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/products/:id/assignment', async (req, res) => {
  try {
    const id = req.params.id;
    // Fetch the syllabus data based on the productId
    const product = await Products.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Assuming 'syllabus' is the field containing the syllabus data
    const assignment = product.assignment;
    res.json(assignment);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:productId/syllabus/:syllabusId/topic/:topicId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const syllabusId = req.params.syllabusId;
    const topicId = req.params.topicId;
    
    // Assuming 'syllabus' is an array field within your 'Product' model
    const product = await Products.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Assuming 'syllabus' is the field containing the syllabus data
    const syllabus = product.syllabus;
    
    // Find the specific syllabus item based on syllabusId
    const selectedSyllabusItem = syllabus.find(item => item._id.toString() === syllabusId);
    
    if (!selectedSyllabusItem) {
      return res.status(404).json({ error: 'Syllabus item not found' });
    }

    // Assuming 'topic' is an array field within 'selectedSyllabusItem'
    const syllabusTopics = selectedSyllabusItem.topic;

    // Find the specific topic item based on topicId
    const selectedTopic = syllabusTopics.find(topic => topic._id.toString() === topicId);

    if (!selectedTopic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    res.json(selectedTopic);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  router.post('/update/:_id', async (req, res) => {
    try {
      const updatedProduct = await Products.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error: ' + err });
    }
  });
  
  router.delete('/delete/:id', async(req,res) => {
    await Products.findByIdAndDelete(req.params.id)
    
    try{
      res.status(204).json({
          status : 'Success',
          data : {}
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
  })
  
module.exports = router;


