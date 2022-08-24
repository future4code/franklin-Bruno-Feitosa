import connection from "../../connection";

export const createMovieFunction = async (
  id: string,
  title: string,
  synopsis: string,
  release_Date: Date,
  rating: number,
  playing_limit_date: Date
) => {
  await connection
    .insert({
      id: id,
      title: title,
      synopsis: synopsis,
      release_Date: release_Date,
      rating: rating,
      playing_limit_date: playing_limit_date,
    })
    .into("Movie");
};
