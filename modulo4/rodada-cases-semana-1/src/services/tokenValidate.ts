import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/ErrorHandler";
import { Authenticator } from "./Authenticator";

export const tokenValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await new Authenticator().getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    next();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      res.status(error.errorCode).send({ message: error.message });
    }
    res.status(500).send({ message: "Internal Server Error" });
  }
};
