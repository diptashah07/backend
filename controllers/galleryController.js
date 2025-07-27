exports.uploadGalleryItem = async (req, res) => {
  try {
    const Gallery = req.db.model("Gallery");
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGalleryItems = async (req, res) => {
  try {
    const Gallery = req.db.model("Gallery");
    const items = await Gallery.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
