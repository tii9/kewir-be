import express from "express";
import { createCheckoutController, notificationController } from "./payment.controller";

const PaymentRouter = express.Router();

PaymentRouter.post("/:orderId/checkout", createCheckoutController);
PaymentRouter.post("/notification", notificationController); // Midtrans webhook target

export default PaymentRouter;