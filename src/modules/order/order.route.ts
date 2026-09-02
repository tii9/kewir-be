import express from "express";
import {
  checkoutController,
  getOrderController,
  getUserOrdersController,
  updateOrderStatusController,
} from "./order.controller";

const OrderRouter = express.Router();

OrderRouter.post("/:userId/checkout", checkoutController);
OrderRouter.get("/detail/:orderId", getOrderController);
OrderRouter.get("/:userId", getUserOrdersController);
OrderRouter.patch("/:orderId/status", updateOrderStatusController);

export default OrderRouter;