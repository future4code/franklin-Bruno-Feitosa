import { getActorsByIdFunction } from "./getActorsByIdFunction";
import { Request, Response } from "express";

export const getActorsById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const actors = await getActorsByIdFunction(id);
    res.status(200).send(actors);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
};
