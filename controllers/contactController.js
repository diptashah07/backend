exports.submitContact = async (req, res) => {
  try {
    const Contact = req.db.model("Contact");
    const message = await Contact.create(req.body);
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const Contact = req.db.model("Contact");
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
