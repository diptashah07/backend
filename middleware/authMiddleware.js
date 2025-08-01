const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        req.tenantId = decoded.tenantId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = authMiddleware;
