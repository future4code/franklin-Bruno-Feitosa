import connection from "../../connection";

export const deleteActorFunction = async (id: string): Promise<void> => {
  await connection.delete().where("id", id).from("Actor");
};
