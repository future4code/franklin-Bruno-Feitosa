import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";
import { AuthenticationData } from "../types";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      throw new Error("Senha inválida");
    }

    if (!email || email.indexOf("@") === -1) {
      throw new Error("Email inválido");
    }

    // const getUserByEmail = async (email: string) => {
    //   const result = await connection.select("*").from("User").where({ email });

    //   return result[0];
    // };
    // const [user] = await connection("User").where("email", email);
    const [user] = await connection("User").where({ email });

    if (!user || user.password !== password) {
      throw new Error("Senha incorreta ou usuário inexistente");
    }

    const authenticator = new Authenticator();
    const payload: AuthenticationData = {
      id: user.id,
    };

    const token = authenticator.generateToken(payload);

    res.status(201).send({ accessToken: token });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};
