const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = router; // export the router to be used elsewhere

// Register Method
router.post("/register", async (req, res) => {
  const { user: username, pass: password, auth: adminAuth } = req.body;
  console.log(
    "Register request recieved with, ",
    username,
    password,
    adminAuth
  );
  console.log("Req.body: ", req.body);

  try {
    // confirm that no one has registered this username
    const existingUser = await User.findOne({ user: username });
    console.log("Existing user, ", existingUser);
    if (existingUser === null) {
      console.log("reached");
      //   res.status(400).json({ message: "User already exists" });
      // }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        user: username,
        pass: hashedPassword,
        auth: adminAuth,
        notes: [],
      });
      console.log("Registering new user, ", newUser);
      const userToSave = await newUser.save();

      // generate a jwt to send back to the front end
      const token = jwt.sign(
        {
          user: userToSave.user,
          auth: userToSave.auth,
        },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ user: userToSave, token });
      console.log(token);
    } else {
      res.status(200).json({ message: "User is already registered" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN Method
router.post("/login", async (req, res) => {
  console.log("Login request recieved");
  const { user, pass } = req.body;
  try {
    const data = await User.findOne({ user });
    if (data) {
      const isMatch = await bcrypt.compare(pass, data.pass);
      if (isMatch) {
        // generate a jwt to send to front end
        let auth = data.auth;
        const token = jwt.sign({ user, auth, pass }, "secret", {
          expiresIn: "1h",
        });
        res.status(200).json({ user, auth, token, authStatus: true });
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
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  console.log("Delete user request recieved");
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user auth settings
router.put("/users/:id", async (req, res) => {
  console.log("update user auth request recieved");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { auth: req.body.auth } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
