import { Request, Response } from "express";
import { averageSalaryByGenderFunction } from "./averageSalaryByGenderFunction";

export const averageSalaryByGender = async (req: Request, res: Response) => {
  try {
    const gender: string = req.params.gender;
    const averageSalary = await averageSalaryByGenderFunction(gender);
    res.status(200).send(averageSalary);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
};
