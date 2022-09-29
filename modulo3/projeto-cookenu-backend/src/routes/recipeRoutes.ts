import { Router } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeController } from "../controller/RecipeController";
import { RecipeDatabase } from "../database/RecipeDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const recipeRoutes = Router();

const recipeController = new RecipeController(
  new RecipeBusiness(
    new RecipeDatabase(),
    new Authenticator(),
    new IdGenerator()
  )
);

recipeRoutes.post("/", recipeController.createRecipe);
recipeRoutes.get("/:id", recipeController.getRecipe);
recipeRoutes.put("/:id", recipeController.editRecipe);
recipeRoutes.delete("/:id", recipeController.deleteRecipe);
// userRoutes.get("/", UserController.getUsers);
// userRoutes.put("/users/:id", UserController.editUser);
