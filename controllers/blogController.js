const Blog = require("../models/blogs");

const filterObj = (obj) => {
  let newObj = {};
  const fields = [
    "title",
    "description",
    "content",
    "mixedLanguage",
    "date",
    "audio",
  ];
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllBlogs = async (req, res, next) => {
  let query = Blog.find();
  query = query.sort("-date");
  const blogs = await query;
  res.status(200).json({
    status: "success",
    length: blogs.length,
    data: {
      blogs,
    },
  });
};

exports.getOneBlog = async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.status(200).json({
    status: "success",
    data: {
      blog,
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
  await Blog.findOneAndDelete({ slug: req.params.slug });

  res.status(200).json({
    status: "success",
    data: null,
  });
};

exports.updateBlog = async (req, res, next) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug },
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

exports.getNumberOfViews = async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  res.status(200).json({
    status: "success",
    data: {
      views: blog.views,
    },
  });
};
