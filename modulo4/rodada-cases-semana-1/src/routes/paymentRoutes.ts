import { Router } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { PaymentController } from "../controller/PaymentController";
import { PaymentDatabase } from "../database/PaymentDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const paymentRoutes = Router();

const paymentController = new PaymentController(
  new PaymentBusiness(
    new PaymentDatabase(),
    new Authenticator(),
    new IdGenerator()
  )
);

paymentRoutes.post("/create", paymentController.createPayment);
// paymentRoutes.get("/:id", paymentController.getPayment);
// paymentRoutes.put("/:id", paymentController.editPayment);
// paymentRoutes.delete("/:id", paymentController.deletePayment);
// userRoutes.get("/", UserController.getUsers);
// userRoutes.put("/users/:id", UserController.editUser);
