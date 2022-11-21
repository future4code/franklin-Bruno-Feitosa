import { Router } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { PaymentController } from "../controller/PaymentController";
import { PaymentDatabase } from "../database/PaymentDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { tokenValidate } from "../services/tokenValidate";

export const paymentRoutes = Router();

const paymentController = new PaymentController(
  new PaymentBusiness(
    new PaymentDatabase(),
    new Authenticator(),
    new IdGenerator()
  )
);

paymentRoutes.post("/create", tokenValidate, paymentController.createPayment);
paymentRoutes.get("/status", tokenValidate, paymentController.allPayments);
paymentRoutes.get(
  "/status/:paymentId",
  tokenValidate,
  paymentController.singlePaymentStatus
);
paymentRoutes.delete(
  "/:paymentId",
  tokenValidate,
  paymentController.deletePayment
);
