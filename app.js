const express = require("express");

const app = express();

const blogRouter = require("./routes/blogRoute");
const viewRouter = require("./routes/viewRoute");

// Body Parser
app.use(express.json({ limit: "10kb" }));

// Serving Static Files
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/blog", blogRouter);
app.use("/", viewRouter);

app.set("view engine", "pug");
app.set("views", "./views");

module.exports = app;
