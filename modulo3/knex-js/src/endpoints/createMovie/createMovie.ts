import { Request, Response } from "express";
import { createMovieFunction } from "./createMovieFunction";

export const createMovie = async (req: Request, res: Response) => {
  const { id, title, synopsis, release_Date, rating, playing_limit_date } =
    req.body;
  try {
    createMovieFunction(
      id,
      title,
      synopsis,
      release_Date,
      rating,
      playing_limit_date
    );
    res.status(201).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected Error");
  }
};
