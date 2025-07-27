const mongoose = require("mongoose");
const connections = {};

const getTenantDb = async (tenantName, uri) => {
  if (connections[tenantName]) return connections[tenantName];

  const conn = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.model("User", require("../models/user"));
  conn.model("Product", require("../models/product"));

  connections[tenantName] = conn;
  return conn;
};

module.exports = getTenantDb;
