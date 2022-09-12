import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../types";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {
  generateToken = (payload: AuthenticationData) => {
    // Gera o token
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: "1min",
    });
  };

  getTokenData = (token: string) => {
    const tokenData = jwt.verify(token, process.env.JWT_KEY as string);

    return tokenData;
  };
}
