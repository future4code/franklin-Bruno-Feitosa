import { Request, Response } from "express";
import { connection } from "../connection";
import { DbUser } from "../types";

export const getAllUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const result: DbUser[] = await connection.select("*").from("TodoListUser");
    const allUsers = result.map((user) => {
      return { id: user.id, nickname: user.nickname };
    });
    res.status(200).send({ users: [allUsers] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
