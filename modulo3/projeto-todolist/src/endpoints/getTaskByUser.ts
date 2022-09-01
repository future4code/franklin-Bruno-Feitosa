import { Request, Response } from "express";
import { connection } from "../connection";
import { UserAndTask } from "../types";

export const getTaskByUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const creatorUserId: number = Number(req.query.creatorUserId);

  if (!creatorUserId)
    return res
      .status(400)
      .send({ message: "Missing the creatorUserId query param" });

  const result: UserAndTask[] = await connection
    .select("*")
    .from("TodoListTask")
    .join("TodoListUser", "TodoListTask.creator_user_id", "TodoListUser.id");

  const findByUser: UserAndTask[] = result.filter((task) => {
    return task.id === creatorUserId;
  });

  if (!findByUser.length) return res.status(404).send({ tasks: findByUser });

  const allTasksByUser = findByUser.map((task) => {
    const year: string = String(task?.limit_date.getFullYear());
    const month: string = String(`0${task?.limit_date.getMonth() + 1}`);
    const day: string =
      task.limit_date.getDate() < 10
        ? String(`0${task.limit_date.getDate()}`)
        : String(task.limit_date.getDate());

    const formattedDate: string = `${day}/${month}/${year}`;

    return {
      taskId: task.task_id,
      title: task.title,
      description: task.description,
      limitDate: formattedDate,
      creatorUserId: task.creator_user_id,
      status: task.status,
      creatorUserNickname: task.nickname,
    };
  });
  res.send({ tasks: allTasksByUser });
};
