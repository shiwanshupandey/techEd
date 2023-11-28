const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const {googleLogin} =  require ('../controller/auth.js');
const nodemailer = require("nodemailer");
const { check, validationResult } = require('express-validator')
const multer = require('multer');




router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, passwordCheck, role } = req.body;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // Validate input
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
    }

    if (!password.match(passwordRegex)) {
      return res.status(400).json({ msg: "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, and 1 number." });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Enter the same password twice for verification." });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format." });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "An account with this email already exists." });
    }

    if (!fullname) {
      fullname = email;
    }

    if (!role) {
      role = "User";
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      fullname,
      role,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



function isValidEmail(email) {
  // You can use a regular expression or a library like validator.js to validate email format.
  // Here's a simple regular expression for demonstration purposes:
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


router.post('/googlelogin',googleLogin)

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    // const payload = { sub: user.id, role: user.role };
    const token = jwt.sign({ id: user._id,email: user.email }, process.env.JWT_SECRET,{
      expiresIn: "60m",
    });
    console.log("token",token);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email:", email); // Add this line for debugging

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });

    console.log("Stored Hashed Password:", user.password); // Add this line for debugging

    if (!user)
      return res.status(400).json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match Result:", isMatch); // Add this line for debugging

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // const payload = { sub: user.id, role: user.role };
    const token = jwt.sign({ id: user._id,email: user.email }, process.env.JWT_SECRET,{
      expiresIn: "60m",
    });
    console.log("token",token);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





router.post("/userData/", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract user's email from the decoded token
    const useremail = decoded.email;

    // Find the user in the database by email
    const data = await User.findOne({ email: useremail });

    if (!data) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Send the user data in the response
    res.status(200).json({ status: "ok", data: data });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ status: "error", message: "Token expired" });
    }

    // Handle other JWT-related errors
    res.status(400).json({ status: "error", message: error.message });
  }
});


router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/forgot-password',(req,res) =>{
  const {email} = req.body;
  User.findOne({email: email})
  .then(user =>{
    if(!user){
      return res.send({Status: "user not existed"})
    }
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: "1d"})
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shiwanshuanooppandey@gmail.com',
        pass: 'tmjwksbkecottgak'
      }
    });
    
    var mailOptions = {
      from: 'shiwanshuanooppandey@gmail.com',
      to: 'shiwanshupandey1@gmail.com',
      subject: 'Reset Your Password',
      text: `http://localhost:3000/reset-password/${user._id}/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        return res.send({Status: "Success"})
      }
    });
  })
})

router.post('/reset-password/:id/:token',(req,res)=>{
  const {id, token} = req.params
  const{password} = req.body

  if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

  jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
    if(err){
      return res.json({Status: "Error with token"})
    }
    else{
      bcrypt.hash(password, 10)
      .then(hash =>{
        User.findByIdAndUpdate({_id: id},{password: hash})
        .then(u => res.send({Satus: "Success"}))
        .catch(err => res.send({Status: err}))
      })
      .catch(err => res.send({Status: err}))
    }
  })
})


router.post('/add', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create a new User instance with hashed password and token
    const user = new User({
      email,
      password: hashedPassword,
      token,
    });

    await user.save();

    res.status(201).json({
      status: 'Success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});


router.get('/get', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users); // Return the array of users directly
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err,
    });
  }
});

router.route('/:id').get((req,res) => {
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: '+err));
  });


router.post('/update/:id', async (req,res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;

  // Specify the directory where files will be saved
  const uploadPath = 'uploads/' + uploadedFile.name;

  // Move the uploaded file to the specified directory
  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!');
  });
});




router.delete('/delete/:id', async(req,res) => {
  await User.findByIdAndDelete(req.params.id)
  
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

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    email: user.email,
    id: user._id,
  });
});

router.put('/updated/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Call the static method to update user data
    const updatedUser = await User.updateUserById(id, updatedData);

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;

