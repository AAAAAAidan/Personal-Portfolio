const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// Images
router.get("/images", apiController.api_image_get_all);
router.post("/images", apiController.api_image_post);
router.get("/images/:id", apiController.api_image_get);
router.put("/images/:id", apiController.api_image_put);
router.delete("/images/:id", apiController.api_image_delete);

// Videos
router.get("/videos", apiController.api_video_get_all);
router.post("/videos", apiController.api_video_post);
router.get("/videos/:id", apiController.api_video_get);
router.put("/videos/:id", apiController.api_video_put);
router.delete("/videos/:id", apiController.api_video_delete);

module.exports = router;
