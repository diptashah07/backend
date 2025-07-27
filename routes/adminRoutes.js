const express = require("express");
const router = express.Router();
const { createTenant, getTenants } = require("../controllers/adminController");

router.post("/tenants", createTenant);
router.get("/tenants", getTenants);

module.exports = router;
