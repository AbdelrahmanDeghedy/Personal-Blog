const Blog = require("../models/blogs");

exports.getHomeView = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).render("base", { blogs });
};

exports.getOneBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).render("blog", { blog });
};
