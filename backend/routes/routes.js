const express = require("express");
const router = express.Router();
const Model = require("../models/user_model");
module.exports = router; // export the router to be used elsewhere

// POST Method
router.post("/register", async (req, res) => {
  console.log("Register request recieved");
  const data = new Model({
    user: req.body.user,
    pass: req.body.pass,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN Method
router.post("/login", async (req, res) => {
  console.log("Login request recieved");
  const { user, pass } = req.body;
  try {
    const data = await Model.findOne({ user, pass });
    if (data) {
      res.status(200).json({ message: "login successful", authStatus: true });
    } else {
      res
        .status(401)
        .json({ message: "Invalid username or password", authStatus: false });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
