import { ICreateRecipeInputDTO, IRecipesDB, Recipe } from "../models/Recipe";
import { IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
  public static TABLE_RECIPES = "Cookenu_Recipes";
  public static TABLE_USERS = "Cookenu_Users";

  public toRecipeDBModel = (
    id: string,
    recipe: Recipe,
    name: string,
    userId: string
  ): IRecipesDB => {
    const recipeDb: IRecipesDB = {
      id: id,
      title: recipe.getTitle(),
      description: recipe.getDescription(),
      step_by_step: recipe.getStepByStep(),
      creation_date: new Date().toLocaleString(),
      user_id: userId,
      user_name: name,
    };

    return recipeDb;
  };

  public createRecipeDB = async (
    id: string,
    recipe: Recipe,
    name: string,
    userId: string
  ): Promise<void> => {
    const recipesDb: IRecipesDB = this.toRecipeDBModel(
      id,
      recipe,
      userId,
      name
    );
    await BaseDatabase.connection(RecipeDatabase.TABLE_RECIPES).insert(
      recipesDb
    );
  };

  public getRecipeById = async (id: string): Promise<IRecipesDB> => {
    const result: IRecipesDB[] = await BaseDatabase.connection(
      RecipeDatabase.TABLE_RECIPES
    )
      .select("*")
      .where({ id });

    return result[0];
  };

  public getUserById = async (id: string): Promise<IUserDB> => {
    const result: IUserDB[] = await BaseDatabase.connection(
      RecipeDatabase.TABLE_USERS
    )
      .select("*")
      .where({ id });

    return result[0];
  };

  public editRecipeDB = async (
    body: ICreateRecipeInputDTO,
    id: string
  ): Promise<void> => {
    await BaseDatabase.connection(RecipeDatabase.TABLE_RECIPES)
      .select("*")
      .update(body)
      .where({ id });
  };

  public deleteRecipeDB = async (id: string): Promise<void> => {
    await BaseDatabase.connection(RecipeDatabase.TABLE_RECIPES)
      .select("*")
      .delete()
      .where({ id });
  };
}
