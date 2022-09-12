import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization as string;
    const userDb = new UserDatabase();
    const authenticator = new Authenticator();
    const data = authenticator.getData(token);

    const user = await userDb.getById(data.id);
    res.status(200).send({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
