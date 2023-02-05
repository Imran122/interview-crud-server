const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

exports.signup = (req, res) => {
  const { name, email, password, profileImage, role } = req.body;
  //const profile = req.files.profileImage;

  //console.log("file", profile);

  //const encodeedPic = picData.toString("base64");
  //const profileImage = Buffer.from(encodeedPic, "base64");
  //console.log(profileImage);
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
  });
  let rol = JSON.parse(role);

  let newUser = new User({
    name,
    email,
    profileImage,
    role: rol.role,
    password,
  });

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

//show user list
exports.userListData = async (req, res) => {
  try {
    const test = await User.find({});

    res.json(test);
  } catch (error) {
    res.json({ message: error });
  }
};
