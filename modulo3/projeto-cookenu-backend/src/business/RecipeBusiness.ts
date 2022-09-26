import { RecipeDatabase } from "../database/RecipeDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { ICreateRecipeInputDTO, Recipe } from "../models/Recipe";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeBusiness {
  constructor(
    protected RecipeDatabase: RecipeDatabase,
    protected Authenticator: Authenticator,
    protected IdGenerator: IdGenerator
  ) {}

  public createRecipe = async (input: ICreateRecipeInputDTO, token: string) => {
    const title = input.title;
    const description = input.description;
    const step_by_step = input.step_by_step;

    if (!title || !description || !step_by_step) {
      throw new Error("Um ou mais parâmetros faltando");
    }

    if (typeof title !== "string" || title.length < 3) {
      throw new Error("Parâmetro 'title' inválido");
    }

    if (!token) {
      throw new Error("Token não informado");
    }

    const id: string = await this.IdGenerator.generate();

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const user = await this.RecipeDatabase.getUserById(tokenInfo.id);

    const recipe = new Recipe(title, description, step_by_step);

    await this.RecipeDatabase.createRecipeDB(id, recipe, user.id, user.name);

    const response = {
      message: "Receita criada com sucesso",
    };

    return response;
  };

  public getRecipe = async (id: string, token: string) => {
    if (!token) {
      throw new Error("Token não informado");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const response = await this.RecipeDatabase.getRecipeById(id);

    return response;
  };
}
