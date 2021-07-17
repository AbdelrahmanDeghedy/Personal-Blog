const express = require("express");

const router = express.Router();

const viewController = require("../controllers/viewsController");

router.route("/").get(viewController.getHomeView);
router.route("/create").get(viewController.createBlog);
router.route("/:id").get(viewController.getOneBlog);
router.route("/:id/edit").get(viewController.editBlog);
router.route("/:id/delete").get(viewController.deleteBlog);

module.exports = router;
