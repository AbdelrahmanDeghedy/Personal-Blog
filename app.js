const express = require("express");

const app = express();

const blogRouter = require("./routes/blogRoute");

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/blog", blogRouter);

module.exports = app;
