const express = require("express");
const { uploadGalleryItem, getGalleryItems } = require("../controllers/galleryController");
const  resolveTenantDb  = require("../middleware/tenantMiddleware");

const router = express.Router();

router.post("/", resolveTenantDb, uploadGalleryItem);
router.get("/", resolveTenantDb, getGalleryItems);

module.exports = router;
