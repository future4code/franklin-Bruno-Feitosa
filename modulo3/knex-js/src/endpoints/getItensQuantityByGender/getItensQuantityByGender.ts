import { Request, Response } from "express";
import { getItensQuantityByGenderFunction } from "./getItensQuantityByGenderFunction";

export const getItensQuantityByGender = async (req: Request, res: Response) => {
  try {
    const gender: string = req.params.gender;
    const itensQuantity = await getItensQuantityByGenderFunction(gender);
    res.status(200).send(itensQuantity);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
};
