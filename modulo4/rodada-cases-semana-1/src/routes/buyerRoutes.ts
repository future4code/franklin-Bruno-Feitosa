import { Router } from "express";
import { BuyerBusiness } from "../business/BuyerBusiness";
import { BuyerController } from "../controller/BuyerController";
import { BuyerDatabase } from "../database/BuyerDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { tokenValidate } from "../services/tokenValidate";

export const buyerRoutes = Router();

const buyerController = new BuyerController(
  new BuyerBusiness(
    new BuyerDatabase(),
    new HashManager(),
    new Authenticator(),
    new IdGenerator()
  )
);

buyerRoutes.post("/create", buyerController.createBuyer);
buyerRoutes.post("/login", buyerController.login);
buyerRoutes.get("/info", tokenValidate, buyerController.buyerInfo);
buyerRoutes.get("/:buyerId", tokenValidate, buyerController.buyerInfoById);
buyerRoutes.put("/edit", tokenValidate, buyerController.editUser);
buyerRoutes.put(
  "/edit/password",
  tokenValidate,
  buyerController.editUserPassword
);
buyerRoutes.delete("/:buyerId", tokenValidate, buyerController.deleteBuyer);
