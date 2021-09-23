const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.index_get);
router.get("/portfolio", homeController.portfolio_get);
router.get("/enjoyment", homeController.enjoyment_get);
router.get("/add", homeController.add_get);

module.exports = router;
