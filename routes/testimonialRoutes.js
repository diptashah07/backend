const express = require("express");
const { createTestimonial, getTestimonials } = require("../controllers/testimonialController");
const resolveTenantDb  = require("../middleware/tenantMiddleware");

const router = express.Router();

router.post("/", resolveTenantDb, createTestimonial);
router.get("/", resolveTenantDb, getTestimonials);

module.exports = router;
