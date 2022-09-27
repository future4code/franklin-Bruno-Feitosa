import { Request, response, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import {
  ICreateRecipeInputDTO,
  GetRecipeOutputDTO,
  IEditRecipeInputDTO,
  IDeleteRecipeInputDTO,
} from "../models/Recipe";

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

  public getRecipe = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id as string;

      const recipe = await this.recipeBusiness.getRecipe(id, token);

      const response: GetRecipeOutputDTO = {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        createdAt: recipe.creation_date,
      };

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public editRecipe = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const token = req.headers.authorization as string;
      const body = req.body as ICreateRecipeInputDTO;

      const input: IEditRecipeInputDTO = {
        id,
        token,
        body,
      };

      const response = await this.recipeBusiness.editRecipe(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public deleteRecipe = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const token = req.headers.authorization as string;

      const input: IDeleteRecipeInputDTO = {
        id,
        token,
      };

      const response = await this.recipeBusiness.deleteRecipe(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
