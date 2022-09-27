import { Request, Response } from "express";
import { connection } from "../connection";
import { User } from "../types";

export const editUser = async (req: Request, res: Response): Promise<any> => {
  const id: number = Number(req.params.id);
  const body: User = req.body;

  if (!body.name || !body.nickname)
    return res.status(400).send({ message: "Bad request" });

  const findById: User[] = (
    await connection.select().from("TodoListUser")
  ).filter((user) => {
    return user.id === id;
  });

  if (!findById.length)
    return res.status(404).send({ message: "User not found" });

  await connection
    .update({ name: body.name, nickname: body.nickname })
    .where("id", id)
    .from("TodoListUser");

  res.send({ name: body.name, nickname: body.nickname });
};
