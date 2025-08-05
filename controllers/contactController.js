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

exports.updateContact = async (req, res) => {
  try {
    const Contact = req.db.model("Contact");
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const Contact = req.db.model("Contact");
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
