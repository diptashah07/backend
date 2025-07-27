exports.createTestimonial = async (req, res) => {
  try {
    const Testimonial = req.db.model("Testimonial");
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const Testimonial = req.db.model("Testimonial");
    const testimonials = await Testimonial.find();
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
