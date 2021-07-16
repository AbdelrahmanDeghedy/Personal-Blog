const express = require("express");

const router = express.Router();

const viewController = require("../controllers/viewsController");

router.route("/").get(viewController.getHomeView);

module.exports = router;
