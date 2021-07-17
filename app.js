const express = require("express");

const app = express();

const blogRouter = require("./routes/blogRoute");
const userRouter = require("./routes/userRoute");
const viewRouter = require("./routes/viewRoute");

const globalErrorHandling = require("./controllers/errorController");

// Body Parser
app.use(express.json({ limit: "10kb" }));

// Serving Static Files
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/user", userRouter);
app.use("/", viewRouter);

app.set("view engine", "pug");
app.set("views", "./views");

app.use(globalErrorHandling);

module.exports = app;
