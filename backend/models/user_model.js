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
    auth: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "users_2" }
);

module.exports = mongoose.model("Users", dataSchema);
