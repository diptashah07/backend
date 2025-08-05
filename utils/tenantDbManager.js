const mongoose = require("mongoose");
const connections = {};

const getTenantDb = async (tenantName, uri) => {
  if (connections[tenantName]) return connections[tenantName];

  const conn = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  conn.model("User", require("../models/user"));
  conn.model("Blogs"),require("../models/blog");
  conn.model("contact"),require("../models/contact");
  conn.model("gallery"),require("../models/gallery");
  conn.model("testimonial"),require("../models/testimonial");
  
  

  connections[tenantName] = conn;
  return conn;
};

module.exports = getTenantDb;
