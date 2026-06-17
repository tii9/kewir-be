import express from "express";
import { createCheckout } from "./payment.controller";

const PaymentRouter = express.Router();

PaymentRouter.post('/checkout', createCheckout);

export default PaymentRouter;
