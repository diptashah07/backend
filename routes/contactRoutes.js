const express = require("express");
const { submitContact, getAllContacts } = require("../controllers/contactController");
const  resolveTenantDb = require("../middleware/tenantMiddleware");

const router = express.Router();

router.post("/", resolveTenantDb, submitContact);
router.get("/", resolveTenantDb, getAllContacts);

module.exports = router;
