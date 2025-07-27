const Tenant = require("../models/tenant");

// Create a new tenant
exports.createTenant = async (req, res) => {
  const { name,dbUri,email,password } = req.body;

  if (!name || !dbUri) {
    return res.status(400).json({ message: "Name and DB URI are required" });
  }

  try {
    const existing = await Tenant.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Tenant already exists" });
    }

    const tenant = new Tenant({ name, dbUri, email, password });
    await tenant.save();

    res.status(201).json({ message: "Tenant created successfully", tenant });
  } catch (err) {
    console.error("Error creating tenant:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tenants
exports.getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.status(200).json(tenants);
  } catch (err) {
    console.error("Error fetching tenants:", err);
    res.status(500).json({ message: "Server error" });
  }
};
