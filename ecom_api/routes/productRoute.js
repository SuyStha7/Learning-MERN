const express = require("express");

const {
  postProduct,
  allProduct,
  productDetail,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const { productValidation, validation } = require("../validation/validator");
const { requireAdmin } = require("../controller/userController");

router.post(
  "/postproduct",
  requireAdmin,
  upload.single("product_image"),
  productValidation,
  validation,
  postProduct
);
router.get("/allproduct", allProduct);
router.get("/productdetail/:id", productDetail);
router.put(
  "/updateproduct/:id",
  requireAdmin,
  upload.single("product_image"),
  productValidation,
  validation,
  updateProduct
);
router.delete("/deleteproduct/:id", requireAdmin, deleteProduct);

module.exports = router;
