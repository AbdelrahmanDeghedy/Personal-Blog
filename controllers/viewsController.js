const Blog = require("../models/blogs");

exports.getHomeView = async (req, res) => {
  try {
    let query = Blog.find();
    query = query.sort("-date");
    const blogs = await query;
    res.status(200).render("base", { blogs });
  } catch (err) {
    console.log(err);
  }
};

exports.getOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    res.status(200).render("blog", { blog });
  } catch (err) {
    console.log(err);
  }
};

exports.createBlog = (req, res) => {
  res.status(200).render("create");
};

exports.editBlog = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.status(200).render("edit", { blog });
};

exports.deleteBlog = (req, res) => {
  res.status(200).render("delete");
};

exports.login = (req, res) => {
  res.status(200).render("login");
};
