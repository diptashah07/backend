exports.getUserCount = async (req, res) => {
  try {
    const db = req.db; // from middleware
    const User = db.model('User');
    const count = await User.countDocuments();
    res.json({ tenant: req.headers['x-tenant-id'], userCount: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
