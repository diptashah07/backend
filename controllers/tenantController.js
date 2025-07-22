const Tenant = require("../models/tenant");
const jwt = require("jsonwebtoken");

const generateToken = (tenant) => {
  return jwt.sign(
    { tenantId: tenant._id, role: "TenantAdmin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.registerTenant = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const existing = await Tenant.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Tenant already exists" });
    }

    const tenant = await Tenant.create({ name, email, password, address });
    const token = generateToken(tenant);
    res.status(201).json({ tenant, token });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.loginTenantAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const tenant = await Tenant.findOne({ email });
    if (!tenant || !(await tenant.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(tenant);
    res.status(200).json({ tenant, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
