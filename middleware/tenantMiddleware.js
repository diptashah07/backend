const mongoose = require("mongoose");
const ProductSchema = require("../models/product");

const connections = {};

const getTenantDB = (tenantId) => {
    if (!connections[tenantId]) {
        const dbURI = `${process.env.MONGO_URI}/${tenantId}`;
        const db = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        connections[tenantId] = {
            db,
            Product: db.model("Product", ProductSchema)
        };
    }
    return connections[tenantId];
};

module.exports = (req, res, next) => {
    const tenantId = req.header("X-Tenant-ID");
    if (!tenantId) return res.status(400).json({ message: "Missing tenant ID" });

    req.tenant = getTenantDB(tenantId);
    next();
};
