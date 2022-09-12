import connection from "../connection";

// OBS: Poderia ser feito no mesmo arquivo na pasta endpoints, porém pra ficar mais organizado, criei um arquivo separado mesmo.
export const getUserByIdFunction = async (id: string): Promise<any> => {
  const result = await connection("User").where({ id });

  return result[0];
};
