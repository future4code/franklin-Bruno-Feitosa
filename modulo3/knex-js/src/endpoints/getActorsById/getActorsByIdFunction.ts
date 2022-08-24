import connection from "../../connection";

export const getActorsByIdFunction = async (id: string): Promise<any> => {
  const result = await connection.raw(`
      SELECT * FROM Actor WHERE ID = ${id}`);
  return result[0][0];
};
