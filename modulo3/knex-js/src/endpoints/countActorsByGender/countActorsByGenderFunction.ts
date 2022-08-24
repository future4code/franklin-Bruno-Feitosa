import connection from "../../connection";

export const countActorsByGenderFunction = async (
  gender: string
): Promise<any> => {
  const count = await connection
    .count("* as countActorsByGender")
    .where("gender", gender)
    .from("Actor");
  return count[0];
};
