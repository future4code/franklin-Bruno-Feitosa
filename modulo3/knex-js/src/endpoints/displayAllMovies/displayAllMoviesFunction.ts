import connection from "../../connection";

export const displayAllMoviesFunction = async () => {
  const result = await connection.raw(`SELECT * FROM Movie LIMIT 15`);
  return result[0];
};
