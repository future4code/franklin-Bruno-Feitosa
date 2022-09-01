import connection from "../../connection";

export const getMoviesBySearchTermFunction = async (
  searchTerm: string
): Promise<any> => {
  const movie = await connection
    .select("*")
    .where("title", "like", `%${searchTerm}%`)
    .orWhere("synopsis", "like", `%${searchTerm}%`)
    .orderBy("release_Date")
    .from("Movie");
  return movie;
};
