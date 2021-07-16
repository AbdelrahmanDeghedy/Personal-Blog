const Blog = require("../models/blogs");

const filterObj = (obj) => {
  let newObj = {};
  const fields = ["title", "description", "content"];
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find({});

  res.status(200).json({
    status: "success",
    length: blogs.length,
    data: {
      blogs,
    },
  });
};

exports.postBlog = async (req, res, next) => {
  const newBlog = await Blog.create(filterObj(req.body));

  res.status(200).json({
    status: "success",
    data: {
      blog: newBlog,
    },
  });
};

exports.deleteBlog = async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
};

exports.updateBlog = async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    filterObj(req.body),
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
};
