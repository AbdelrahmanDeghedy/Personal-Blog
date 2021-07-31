const express = require("express");

const router = express.Router();

const viewController = require("../controllers/viewsController");

const authConteoller = require("../controllers/authController");

router.route("/").get(viewController.getHomeView);

router.route("/login").get(viewController.login);

router.route("/view/:slug").get(viewController.getOneBlog);
router.use(authConteoller.protect, authConteoller.restrictTo("admin"));
router.route("/create").get(viewController.createBlog);

router.route("/edit/:slug").get(viewController.editBlog);
router.route("/delete/:slug").get(viewController.deleteBlog);

module.exports = router;
