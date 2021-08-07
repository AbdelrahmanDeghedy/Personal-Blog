const mongoose = require("mongoose");

const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      required: [true, "A blog must have a description"],
    },
    mixedLanguage: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: [true, "A blog must have content!"],
    },
    slug: String,
    image: String,
    audio: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
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

blogSchema.index({ slug: 1 });

blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
