const router = require("express").Router();
const Notification = require("../models/Notification.model");

router.post('/add', async(req,res) => {
  const notification = new Notification(req.body)
  try{
      await notification.save()
      res.status(201).json(notification)
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})

router.get('/get', async (req, res) => {
  try {
    const notification = await Notification.find({});
    res.status(200).json(notification); // Return the array of users directly
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err,
    });
  }
});


router.route('/:id').get((req, res) => {
  Notification.findById(req.params.id)
    .then(notification => {
      if (!notification) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(notification);
    })
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

router.post('/update/:_id', async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error: ' + err });
  }
});

// router.post('/update/:id', async (req,res) => {
//   const notification = await Notification.findByIdAndUpdate(req.params.id,req.body,{
//       new : true,
//       runValidators : true
//     })
//   try{
//       res.status(200).json(notification);
//   }catch(err){
//       console.log(err)
//   }
// })

router.delete('/delete/:id', async(req,res) => {
  await Notification.findByIdAndDelete(req.params.id)
  
  try{
    res.status(204).json(notification)
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})

// router.get("/", async (req, res) => {
//   const notification = await Notification.findById(req.notification);
//   res.json({
//     title: notification.title,
//     subject: notification.subject,
//     id: notification.id,
//   });
// });

const deleteOldNotifications = async () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  try {
    // Delete notifications older than one day
    await Notification.deleteMany({ timestamp: { $lt: oneDayAgo } });
    console.log("Old notifications deleted successfully.");
  } catch (err) {
    console.error("Error deleting old notifications:", err);
  }
};

// Set the interval (86400000 milliseconds = 1 day)
setInterval(deleteOldNotifications, 86400000);

module.exports = router;

