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

router.use(authConteoller.protect);

router.route("/delete/:slug").delete(
  // authConteoller.protect,
  authConteoller.restrictTo("admin"),
  blogController.deleteBlog
);
router.route("/edit/:slug").patch(
  // authConteoller.protect,
  authConteoller.restrictTo("admin"),
  blogController.updateBlog
);

module.exports = router;
