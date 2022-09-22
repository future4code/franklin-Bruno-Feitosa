import { Router } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeController } from "../controller/RecipeController";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export const recipeRoutes = Router();

const recipeController = new RecipeController(
  new RecipeBusiness(
    new RecipeDatabase(),
    new Authenticator(),
    new UserDatabase()
  )
);

recipeRoutes.post("/", recipeController.createRecipe);

// userRoutes.get("/info", recipeController.getInfo);
// userRoutes.get("/", UserController.getUsers);
// userRoutes.delete("/users/:id", UserController.deleteUser);
// userRoutes.put("/users/:id", UserController.editUser);
