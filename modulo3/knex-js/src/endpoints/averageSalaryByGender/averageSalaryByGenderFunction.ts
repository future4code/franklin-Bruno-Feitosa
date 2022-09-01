import connection from "../../connection";

export const averageSalaryByGenderFunction = async (
  gender: string
): Promise<any> => {
  const result = await connection
    .avg(`salary as ${gender}AverageSalary`)
    .where("gender", gender)
    .from("Actor");

  return result[0];
};
