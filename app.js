const express = require("express");

const app = express();

const cookieParse = require("cookie-parser");

const blogRouter = require("./routes/blogRoute");
const userRouter = require("./routes/userRoute");
const viewRouter = require("./routes/viewRoute");

const globalErrorHandling = require("./controllers/errorController");

const cors = require("cors");
// app.options("*", cors()); // include before other routes
// app.use(cors());

// Body Parser
app.use(express.json({ limit: "50mb" }));

// Cookie Parser
app.use(cookieParse());

// Serving Static Files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/user", userRouter);
app.use("/", viewRouter);

app.set("view engine", "pug");
app.set("views", "./views");

app.use(globalErrorHandling);

module.exports = app;
