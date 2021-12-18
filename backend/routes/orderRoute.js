const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//Creating a new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//Get single order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//Get logged in User Order/My Orders
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//Get all Orders -- Admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

  //Update and delete Orders --Admin
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;