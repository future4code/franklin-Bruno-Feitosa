import connection from "../../connection";

export const getActorsByNameFunction = async (nome: string): Promise<any> => {
  const result = await connection.raw(`
      SELECT * FROM Actor WHERE nome = ${nome}`);
  return result[0][0];
};
