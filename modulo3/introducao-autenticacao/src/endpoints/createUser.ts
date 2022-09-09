import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/idGenerator";
import { AuthenticationData, user } from "../types";

export default async function createUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body;
    const userTableName = "User";

    if (!email || email.indexOf("@") === -1) {
      res.statusCode = 422;
      throw new Error("Invalid email");
    }

    if (!password || password.length < 6) {
      res.statusCode = 422;
      throw new Error("Invalid password");
    }

    const [user] = await connection("User").where({ email });

    if (user) {
      res.statusCode = 409;
      throw new Error("Email já cadastrado");
    }

    const id: string = new IdGenerator().generateId();
    const newUser: user = { id, email, password };

    const payload: AuthenticationData = {
      id: newUser.id,
    };

    const token = new Authenticator().generateToken(payload);

    await connection.insert(newUser).into(userTableName);

    res.status(201).send({ accessToken: token });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500).send({ message: "Internal server error" });
    } else {
      res.send({ message: error.message });
    }
  }
}
