const Blog = require("../models/blogs");

exports.getHomeView = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).render("base", { blogs });
  } catch (err) {
    console.log(err);
  }
};

exports.getOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).render("blog", { blog });
  } catch (err) {
    console.log(err);
  }
};

exports.createBlog = (req, res) => {
  res.status(200).render("create");
};
