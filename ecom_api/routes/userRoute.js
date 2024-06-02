const express = require("express");
const {
  postUser,
  postEmailConfirmation,
  signIn,
  forgetPassword,
  resetPassword,
  usersList,
  userDetail,
  signOut,
  requireAdmin,
  requireUser,
} = require("../controller/userController");
const {
  userValidation,
  validation,
  passwordValidation,
} = require("../validation/validator");
const router = express.Router();

router.post("/register", userValidation, validation, postUser);
router.put("/confirmation/:token", postEmailConfirmation);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/forgetpassword", forgetPassword);
router.put(
  "/resetpassword/:token",
  passwordValidation,
  validation,
  resetPassword
);
router.get("/userlist", requireAdmin, usersList);
router.get("/userdetail/:id", requireUser, userDetail);
module.exports = router;
