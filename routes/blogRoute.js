const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blogController");

const authConteoller = require("../controllers/authController");

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    authConteoller.protect,
    authConteoller.restrictTo("admin"),
    blogController.postBlog
  );
router.route("/view/:id").get(blogController.getOneBlog);

router
  .route("/delete/:id")
  .delete(
    authConteoller.protect,
    authConteoller.restrictTo("admin"),
    blogController.deleteBlog
  );
router
  .route("/edit/:id")
  .patch(
    authConteoller.protect,
    authConteoller.restrictTo("admin"),
    blogController.updateBlog
  );

module.exports = router;
