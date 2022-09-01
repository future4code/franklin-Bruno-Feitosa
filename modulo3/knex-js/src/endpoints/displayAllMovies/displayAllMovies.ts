import { Request, Response } from "express";
import { displayAllMoviesFunction } from "./displayAllMoviesFunction";

export const displayAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await displayAllMoviesFunction();
    res.status(201).send(movies);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected Error");
  }
};
