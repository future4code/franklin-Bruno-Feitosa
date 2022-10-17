import { Router } from "express";
import { BuyerBusiness } from "../business/BuyerBusiness";
import { BuyerController } from "../controller/BuyerController";
import { BuyerDatabase } from "../database/BuyerDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

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
buyerRoutes.get("/", buyerController.buyerInfo);
buyerRoutes.get("/:buyerId", buyerController.buyerInfoById);
buyerRoutes.put("/edit", buyerController.editUser);
buyerRoutes.put("/edit/password", buyerController.editUserPassword);
buyerRoutes.delete("/:buyerId", buyerController.deleteBuyer);
