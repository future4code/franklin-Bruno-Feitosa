import { RecipeDatabase } from "../database/RecipeDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { ICreateRecipeInputDTO, Recipe } from "../models/Recipe";
import { Authenticator, ITokenPayload } from "../services/Authenticator";

export class RecipeBusiness {
  constructor(
    protected RecipeDatabase: RecipeDatabase,
    protected Authenticator: Authenticator,
    protected UserDatabase: UserDatabase
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

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const user = await this.UserDatabase.getUserById(tokenInfo.id);

    const recipe = new Recipe(title, description, step_by_step);

    await this.RecipeDatabase.createRecipe(recipe, user.id, user.name);

    const response = {
      message: "Receita criada com sucesso",
    };

    return response;
  };
}
