import connection from "../../connection";

export const updateSalaryFunction = async (
  id: string,
  salary: number
): Promise<void> => {
  await connection
    .update({
      salary: salary,
    })
    .where("id", id)
    .from("Actor");
};
