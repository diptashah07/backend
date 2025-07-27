const express = require("express");
const { createBlog, getBlogs } = require("../controllers/blogController");
const  resolveTenantDb  = require("../middleware/tenantMiddleware");

const router = express.Router();

router.post("/", resolveTenantDb, createBlog);
router.get("/", resolveTenantDb, getBlogs);

module.exports = router;
