import { Request, Response } from "express";
import { updateSalaryFunction } from "./updateSalaryFunction";

export const updateSalary = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const salary: number = req.body.salary;
    const newSalary = await updateSalaryFunction(id, salary);

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
};
