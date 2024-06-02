const express = require("express");
const {
  postCategory,
  allCategory,
  categoryDetail,
  deleteCategory,
  updateCategory,
} = require("../controller/categoryController");
const { categoryValidation, validation } = require("../validation/validator");
const { requireAdmin } = require("../controller/userController");
const router = express.Router();

router.post(
  "/postcategory",
  requireAdmin,
  categoryValidation,
  validation,
  postCategory
);
router.get("/allcategory", allCategory);
router.get("/categorydetail/:id", categoryDetail);
router.delete("/deletecategory/:id", requireAdmin, deleteCategory);
router.put(
  "/updatecategory/:id",
  requireAdmin,
  categoryValidation,
  validation,
  updateCategory
);
module.exports = router;
