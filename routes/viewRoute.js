const express = require("express");

const router = express.Router();

const viewController = require("../controllers/viewsController");

const authConteoller = require("../controllers/authController");

router.route("/").get(viewController.getHomeView);
router.route("/:id").get(viewController.getOneBlog);

router.use(authConteoller.protect, authConteoller.restrictTo("admin"));

router.route("/create").get(viewController.createBlog);
router.route("/:id/edit").get(viewController.editBlog);
router.route("/:id/delete").get(viewController.deleteBlog);

module.exports = router;
