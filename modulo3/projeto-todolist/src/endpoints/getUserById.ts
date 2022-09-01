import { Request, Response } from "express";
import { connection } from "../connection";
import { User } from "../types";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id: number = Number(req.params.id);

  if (!id)
    return res.status(400).send({ message: "Missing the id path variable" });

  const findById: User[] = (
    await connection.select().from("TodoListUser")
  ).filter((user) => {
    return user.id === id;
  });
  if (!findById.length)
    return res.status(404).send({ message: "User not found" });
  res.send({ id: id, nickname: findById[0].nickname });
};
