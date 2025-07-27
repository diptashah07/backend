// middleware/tenantMiddleware.js
const Tenant = require("../models/tenant");
const getTenantDb = require("../utils/tenantDbManager");

module.exports = async (req, res, next) => {
  const tenantId = req.headers["x-tenant-id"];
  if (!tenantId) return res.status(400).json({ message: "Missing tenant ID" });

  const tenant = await Tenant.findOne({ name: tenantId });
  if (!tenant) return res.status(404).json({ message: "Tenant not found" });

  req.db = await getTenantDb(tenant.name, tenant.dbUri);
  next();
};
