const Blog = require("../models/blogs");

exports.getHomeView = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).render("base", { blogs });
};
