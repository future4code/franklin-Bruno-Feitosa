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

buyerRoutes.post("/card", buyerController.registerCard);
buyerRoutes.post("/create", buyerController.createBuyer);
buyerRoutes.post("/login", buyerController.login);
// buyerRoutes.get("/:id", buyerController.getbuyer);
// buyerRoutes.put("/:id", buyerController.editbuyer);
// buyerRoutes.delete("/:id", buyerController.deletebuyer);
// userRoutes.get("/", UserController.getUsers);
// userRoutes.put("/users/:id", UserController.editUser);
