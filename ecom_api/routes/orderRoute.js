const express = require("express");
const {
  postOrder,
  orderList,
  orderDetails,
  updateStatus,
  userList,
} = require("../controller/orderController");
const { requireUser, requireAdmin } = require("../controller/userController");
const router = express.Router();

router.post("/postorder", requireUser, postOrder);
router.get("/orderlist", requireAdmin, orderList);
router.get("/orderdetails/:id", orderDetails);
router.put("/updatestatus/:id", updateStatus);
router.get("/userorderlist/:userid", requireUser, userList);

module.exports = router;
