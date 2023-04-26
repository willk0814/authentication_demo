const express = require("express");
const router = express.Router();
const Model = require("../models/user_model");
module.exports = router; // export the router to be used elsewhere

// POST Method
router.post("/register", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  console.log("Request recieved");
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
router.get("/login", async (req, res) => {
  const { user, pass } = req.body;
  try {
    const data = await Model.findOne({ user, pass });
    if (data) {
      res.status(200).json({ message: "login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
