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

exports.updateGalleryItem = async (req, res) => {
  try {
    const Gallery = req.db.model("Gallery");
    const updatedItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const Gallery = req.db.model("Gallery");
    const deletedItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }
    res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
