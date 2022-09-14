import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";

export default class UserController {
  public signup = async (req: Request, res: Response) => {
    try {
      const input: any = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();
      const response = await userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input: any = {
        email: req.body.email,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();

      const response = await userBusiness.login(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.headers.authorization as string;

      const userBusiness = new UserBusiness();

      const response = await userBusiness.getAllUsers(token);
      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.headers.authorization as string;
      const id: string = req.params.id;

      const userBusiness = new UserBusiness();

      const response = await userBusiness.deleteUser(token, id);
      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Erro inesperado" });
    }
  };
}
