const express = require("express");
const { getUserCount } = require("../controllers/dashboardController");
const { resolveTenantDb } = require("../middleware/tenantMiddleware");

const router = express.Router();

router.get("/users/count", resolveTenantDb, getUserCount);

module.exports = router;
