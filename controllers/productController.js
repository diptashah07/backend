exports.createProduct = async (req, res) => {
    try {
        const product = await req.tenant.Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await req.tenant.Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await req.tenant.Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await req.tenant.Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
