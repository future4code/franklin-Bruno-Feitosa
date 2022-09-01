import connection from "../../connection";

export const getItensQuantityByGenderFunction = async (
  gender: string
): Promise<any> => {
  const result = await connection.raw(`
  SELECT COUNT(*) AS itensQuantityByGender FROM Actor WHERE gender = ${gender}
  `);
  return result[0][0];
};
