import { Request, Response } from "express";
import { getActorsByNameFunction } from "./getActorsByNameFunction";

export const getActorsByName = async (req: Request, res: Response) => {
  try {
    const nome: string = req.params.nome;
    const actors = await getActorsByNameFunction(nome);
    res.status(200).send(actors);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
};
