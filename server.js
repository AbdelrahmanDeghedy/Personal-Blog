const express = require("express");

const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

const app = require("./app");

const dotenv = require("dotenv");
const { createBlog } = require("./controllers/viewsController");

dotenv.config({ path: "./config.env" }); // the path of the config file

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to cluster successfully!");
  });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
