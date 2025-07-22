const express = require("express");
const router = express.Router();
const tenantMiddleware = require("../middleware/tenantMiddleware");
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require('../middleware/authMiddleware');
router.use(authMiddleware);


router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
