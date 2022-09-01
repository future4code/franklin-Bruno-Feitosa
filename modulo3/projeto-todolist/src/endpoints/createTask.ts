import { Request, Response } from "express";
import { connection } from "../connection";
import { Task } from "../types";

export const createTask = async (req: Request, res: Response) => {
  const body: Task = req.body;

  const formattedLimitDate: string = body.limit_date
    .split("/")
    .reverse()
    .join("/");

  try {
    await connection
      .insert({
        title: body.title,
        description: body.description,
        limit_date: formattedLimitDate,
        creator_user_id: body.creator_user_id,
      })
      .into("TodoListTask");

    res.status(201).send({ message: "Success" });
  } catch (error) {
    if (
      !body.title ||
      !body.description ||
      !body.limit_date ||
      !body.creator_user_id
    ) {
      return res.status(400).send({ message: "Bad request" });
    }
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
