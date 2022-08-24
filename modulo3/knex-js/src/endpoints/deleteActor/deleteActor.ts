import { Request, Response } from "express";
import { deleteActorFunction } from "./deleteActorFunction";

export const deleteActor = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await deleteActorFunction(id);
    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
};
