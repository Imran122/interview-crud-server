const express = require("express");
const router = express.Router();

// import controller

const { authenticate } = require("../middleware/authurize");
// import validators
const { create } = require("../controllers/userPayment");

router.post("/user-payment", authenticate, create);
module.exports = router;
