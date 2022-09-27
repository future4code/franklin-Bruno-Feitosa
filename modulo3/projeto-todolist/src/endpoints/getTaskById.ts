import { Request, Response } from "express";
import { connection } from "../connection";
import { UserAndTask } from "../types";

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id: number = Number(req.params.id);

  if (!id)
    return res.status(400).send({ message: "Missing the id path variable" });

  const result: UserAndTask[] = await connection
    .select("*")
    .from("TodoListTask")
    .join("TodoListUser", "TodoListUser.id", "TodoListTask.creator_user_id");

  const findById: UserAndTask[] = result.filter((task) => {
    return task.task_id === id;
  });

  if (!findById.length)
    return res.status(404).send({ message: "Task not found" });

  const year: string = String(findById[0].limit_date.getFullYear());
  const month: string = String(`0${findById[0].limit_date.getMonth() + 1}`);
  const day: string =
    findById[0].limit_date.getDate() < 10
      ? String(`0${findById[0].limit_date.getDate()}`)
      : String(findById[0].limit_date.getDate());

  const formattedDate: string = `${day}/${month}/${year}`;

  res.send({
    taskId: findById[0].task_id,
    title: findById[0].title,
    description: findById[0].description,
    limitDate: formattedDate,
    status: findById[0].status,
    creatorUserId: findById[0].creator_user_id,
    creatorUserNickname: findById[0].nickname,
  });
};
