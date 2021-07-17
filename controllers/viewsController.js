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
    const blog = await Blog.findById(req.params.id);
    res.status(200).render("blog", { blog });
  } catch (err) {
    console.log(err);
  }
};

exports.createBlog = (req, res) => {
  res.status(200).render("create");
};
