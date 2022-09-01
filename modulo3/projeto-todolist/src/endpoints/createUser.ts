import { Request, Response } from "express";
import { connection } from "../connection";
import { User } from "../types";

export const createUser = async (req: Request, res: Response) => {
  const body: User = req.body;
  try {
    await connection
      .insert({
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
      })
      .into("TodoListUser");

    res.status(201).send({ message: "Success" });
  } catch (error) {
    if (!body.name || !body.nickname || !body.email) {
      return res.status(400).send({ message: "Bad request" });
    }
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
