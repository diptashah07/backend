exports.createBlog = async (req, res) => {
  try {
    const db = req.db;
    const Blog = db.model("Blog", require("../models/blog"));
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const db = req.db;
    const Blog = db.model("Blog", require("../models/blog"));
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
