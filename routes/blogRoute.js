const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blogController");

router.route("/").get(blogController.getAllBlogs).post(blogController.postBlog);
router
  .route("/:id")
  .delete(blogController.deleteBlog)
  .patch(blogController.updateBlog);

module.exports = router;
