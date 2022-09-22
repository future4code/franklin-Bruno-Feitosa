import { IRecipesDB, Recipe } from "../models/Recipe";
import { IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
  public static TABLE_RECIPES = "Cookenu_Recipes";

  public toRecipeDBModel = (
    recipe: Recipe,
    name: string,
    id: string
  ): IRecipesDB => {
    const recipeDb: IRecipesDB = {
      title: recipe.getTitle(),
      description: recipe.getDescription(),
      step_by_step: recipe.getStepByStep(),
      creation_date: new Date().toLocaleString(),
      user_id: id,
      user_name: name,
    };

    return recipeDb;
  };

  public createRecipe = async (
    recipe: Recipe,
    name: string,
    id: string
  ): Promise<void> => {
    const recipesDb: IRecipesDB = this.toRecipeDBModel(recipe, id, name);
    await BaseDatabase.connection(RecipeDatabase.TABLE_RECIPES).insert(
      recipesDb
    );
  };
}
