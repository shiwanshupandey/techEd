const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");



// set up express

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your client's origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

app.post("/process_form", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shiwanshuanooppandey@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: email,
    to: "your-destination-email@example.com",
    subject: "New Contact Form Submission",
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});



function authenticateUser(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
}

app.get('/admin', authenticateUser, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Admin access granted.' });
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


app.use("/users", require("./routes/users"));
app.use("/exam", require("./routes/Exam"));
app.use("/assignment", require("./routes/Assignment"));
app.use("/notification", require("./routes/Notification"));
app.use("/purchases", require("./routes/purchased"));
app.use("/products", require("./routes/Products"));
app.use("/category", require("./routes/Category"));
app.use("/review", require("./routes/Review"));
app.use("/teacher", require("./routes/Teacher"));
app.use("/attend", require("./routes/Attendance"));
app.use("/result", require("./routes/Result"));
app.use("/talk", require("./routes/Talk"));
