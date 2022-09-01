import { Request, Response } from "express";
import { countActorsByGenderFunction } from "./countActorsByGenderFunction";

export const countActorsByGender = async (req: Request, res: Response) => {
  try {
    const gender: string = String(req.query.gender);
    const count = await countActorsByGenderFunction(gender);
    res.status(200).send(count);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
