const express = require("express");
const router = express.Router();
const Model = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = router; // export the router to be used elsewhere

// POST Method
router.post("/register", async (req, res) => {
  console.log("Register request recieved");
  const hashedPaswword = await bcrypt.hash(req.body.pass, 10);
  const data = new Model({
    user: req.body.user,
    pass: hashedPaswword,
    auth: req.body.auth,
  });
  console.log(
    "Registering new user with user, hashedPass: ",
    data.user,
    data.pass,
    data.auth
  );
  try {
    const dataToSave = await data.save();

    // generate a jwt to send to the front end
    const token = jwt.sign({ user: dataToSave.user }, "secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ user: dataToSave.user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN Method
router.post("/login", async (req, res) => {
  console.log("Login request recieved");
  const { user, pass } = req.body;
  try {
    const data = await Model.findOne({ user });
    if (data) {
      const isMatch = await bcrypt.compare(pass, data.pass);
      if (isMatch) {
        // generate a jwt to send to front end
        const token = jwt.sign({ user, pass }, "secret", { expiresIn: "1h" });
        res.status(200).json({ user, token, authStatus: true });
      }
    } else {
      res
        .status(401)
        .json({ message: "Invalid username or password", authStatus: false });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADMIN APIs
// View all users
router.get("/users", async (req, res) => {
  console.log("get all users request recieved");
  try {
    const users = await Model.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  console.log("Delete user request recieved");
  try {
    const user = await Model.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user auth settings
router.put("/users/:id", async (req, res) => {
  console.log("update user auth request recieved");
  try {
    const user = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: { auth: req.body.auth } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
