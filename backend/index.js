require("dotenv").config(); // require .env file with credentials

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");

// establish  database connection
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

// test connection to database
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Server running at localhost:3000/`);
});
