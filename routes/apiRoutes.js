const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/files", apiController.api_file_get_all);
router.post("/files", apiController.api_file_post);
router.get("/files/:id", apiController.api_file_get);
router.put("/files/:id", apiController.api_file_put);
router.delete("/files/:id", apiController.api_file_delete);

module.exports = router;
