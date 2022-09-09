import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";
import { getUserByIdFunction } from "../services/getUserByIdFunction";
import { AuthenticationData } from "../types";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.headers.authorization as string;
    const tokenData = new Authenticator().getTokenData(
      token
    ) as AuthenticationData;

    const user = await getUserByIdFunction(tokenData.id);

    res.status(200).send({
      id: user.id,
      email: user.email,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
