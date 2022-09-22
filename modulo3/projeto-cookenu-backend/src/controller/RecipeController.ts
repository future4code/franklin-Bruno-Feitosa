import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { ICreateRecipeInputDTO } from "../models/Recipe";

export class RecipeController {
  constructor(protected recipeBusiness: RecipeBusiness) {}

  public createRecipe = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const input: ICreateRecipeInputDTO = {
        title: req.body.title as string,
        description: req.body.description as string,
        step_by_step: req.body.step_by_step as string,
      };

      const response = await this.recipeBusiness.createRecipe(input, token);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
