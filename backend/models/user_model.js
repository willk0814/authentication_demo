const mongoose = require("mongoose"); // import mongoose library

const dataSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("Users", dataSchema);
