import { Request, Response } from "express";
import { getMoviesBySearchTermFunction } from "./getMoviesBySearchTermFunction";

export const getMoviesBySearchTerm = async (req: Request, res: Response) => {
  try {
    const searchTerm: string = String(req.query.searchTerm);
    const movie = await getMoviesBySearchTermFunction(searchTerm);
    res.status(200).send(movie);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
