require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes"); // 💡 Rename tenantRoutes to adminRoutes
const authRoutes = require("./routes/authRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tenantMiddleware = require("./middleware/tenantMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

connectDB(); // Admin DB connection

// 🌐 Admin routes (manage tenants)
app.use("/api/v1/admin", adminRoutes);

// 🌐 Tenant routes (dynamic DB middleware)
app.use("/api/v1/auth", tenantMiddleware, authRoutes);
app.use("/api/v1/testimonials", tenantMiddleware, testimonialRoutes);
app.use("/api/v1/gallery", tenantMiddleware, galleryRoutes);
app.use("/api/v1/contact", tenantMiddleware, contactRoutes);

// 🚀 Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
