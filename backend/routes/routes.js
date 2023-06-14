const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const Note = require("../models/note_model");
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
          id: userToSave._id,
          auth: userToSave.auth,
        },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ user: userToSave, id: token });
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
    const userData = await User.findOne({ user });
    console.log(userData);
    if (userData) {
      const isMatch = await bcrypt.compare(pass, userData.pass);
      if (isMatch) {
        // generate a jwt to send to front end
        const token = jwt.sign({ user, pass }, "secret", {
          expiresIn: "1h",
        });
        res.status(200).json({ userData, token, authStatus: true });
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

// Note APIs
// create a new note
router.post("/addNote", async (req, res) => {
  console.log("called with body, ", req.body);
  try {
    const date = req.body.date;
    const content = req.body.content;
    const userID = req.body.userID;

    // Create and save a new note
    const newNote = new Note({
      date,
      content,
    });
    const savedNote = await newNote.save();

    // Find the user by ID and add the note
    const user = await User.findById(userID);
    user.notes.push(savedNote._id);
    await user.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// retrieve a note given the noteID
router.get("/retrieveAllNotes", async (req, res) => {
  console.log(`Request recieved with userID: ${req.query.userID}`);
  try {
    const user = await User.findById(req.query.userID).populate("notes");
    const notes = user.notes;

    res.status(201).json(notes);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// delete a note given the noteID and the userID
router.delete("/deleteNote", async (req, res) => {
  console.log("Delete note called with body, ", req.body);
  try {
    const note_id = req.body.noteID;
    const user_id = req.body.userID;

    // remove the note from the list of user notes
    const user_obj = await User.findById(user_id);
    const user_notes = user_obj.notes.pull(note_id);
    // reassign the users notes list
    const user = await User.findByIdAndUpdate(
      user_id,
      { $set: { notes: user_notes } },
      { new: true }
    );

    // remove the note from the note collection
    const deleted_note = await Note.findByIdAndDelete(note_id);

    res.status(200).json(deleted_note);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
