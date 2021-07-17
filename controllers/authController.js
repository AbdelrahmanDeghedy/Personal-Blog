const AppError = require("../utils/appError");

const User = require("../models/users");

const jwt = require("jsonwebtoken");

const { promisify } = require("util");

const signToken = (id) => {
  return (token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }));
};

const createSendToken = (user, res, statusCode) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  // Remove password from the output
  user.password = undefined;

  res.cookie("jwt", token, { cookieOptions });
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
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

  createSendToken(user, res, 200);
};

exports.signup = async (req, res, next) => {
  const { email, password, role } = req.body;
  const newUser = await User.create({
    email,
    password,
    role,
  });

  createSendToken(newUser, res, 200);
};

exports.protect = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("The user is not logged in! Please log in to access", 401)
    );
  }
  let decodedPayload;
  try {
    decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError(err, 401));
  }

  const currentUser = await User.findById(decodedPayload.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token doesn't exist", 401)
    );
  }

  req.user = currentUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    next();
  };
};
