const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
  });

  let newUser = new User({ name, email, role, password });

  newUser.save((err, success) => {
    if (err) {
      console.log("SIGNUP ERROR", err);
      return res.status(400).json({ error: err });
    }
    res.json({
      message: "Signup success! Please signin",
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    console.log(user);
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};
