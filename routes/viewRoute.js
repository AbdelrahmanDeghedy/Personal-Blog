const express = require("express");

const router = express.Router();

const viewController = require("../controllers/viewsController");

router.route("/").get(viewController.getHomeView);
router.route("/:id").get(viewController.getOneBlog);

module.exports = router;
