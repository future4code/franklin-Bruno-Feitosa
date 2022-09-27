import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;

    const token = req.headers.authorization as string;
    const userDb = new UserDatabase();
    const authenticator = new Authenticator();
    const data = authenticator.getData(token);

    if (data.role !== "admin") {
      res.statusCode = 401;
      throw new Error("Acesso não autorizado");
    }

    await userDb.delete(id);
    res.sendStatus(200);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
