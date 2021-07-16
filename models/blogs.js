const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      required: [true, "A blog must have a description"],
    },
    content: {
      type: String,
      required: [true, "A blog must have content!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual("minutes").get(function () {
  return parseInt(this.content.split(" ").length / 130);
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
