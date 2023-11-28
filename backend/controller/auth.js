const User = require("../models/user.model");
const jwt =require("jsonwebtoken");
const {OAuth2Client} = require("google-auth-library");

// handles google login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "7d"
            });
            const { _id, email, name } = user;
            return res.json({
              token,
              user: { _id, email, name }
            });
          } else {
            const password = email + process.env.JWT_SECRET;

            user = new User({ name, email, password });
            user
              .save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "User signup failed with google"
                  });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SECRET,
                  { expiresIn: "7d" }
                );
                const { _id, email, name } = data;

                return res.json({
                  token,
                  user: { _id, email, name }
                });
              })
              .catch((err) => {
                return res.status(401).json({
                  message: "signup error"
                });
              });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again"
        });
      }
    });
};
