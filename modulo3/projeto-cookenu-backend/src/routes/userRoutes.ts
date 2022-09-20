import { Router } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const userRoutes = Router();

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new Authenticator(),
    new HashManager(),
    new IdGenerator()
  )
);

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.get("/info", userController.getInfo);
// userRoutes.get("/", UserController.getUsers);
// userRoutes.delete("/users/:id", UserController.deleteUser);
// userRoutes.put("/users/:id", UserController.editUser);
