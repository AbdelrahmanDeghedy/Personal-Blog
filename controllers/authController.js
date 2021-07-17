const AppError = require("../utils/appError");

const User = require("../models/users");

const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return (token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }));
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("password");
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const newUser = await User.create({
    email,
    password,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};
