import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import {
  DeleteUserInputDTO,
  EditUserInputDTO,
  IGetUserInputDTO,
  ILoginInputDTO,
  ISignupInputDTO,
} from "../models/User";

export class UserController {
  constructor(protected userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const input: ISignupInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input: ILoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userBusiness.login(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const input: IGetUserInputDTO = {
        token: req.headers.authorization as string,
        search: req.query.search as string,
        order: req.query.order as string,
        sort: req.query.sort as string,
        limit: Number(req.query.limit),
        page: Number(req.query.page),
      };

      const response = await this.userBusiness.getUsers(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const input: DeleteUserInputDTO = {
        token: req.headers.authorization as string,
        idToDelete: req.params.id,
      };

      const response = await this.userBusiness.deleteUser(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public editUser = async (req: Request, res: Response) => {
    try {
      const input: EditUserInputDTO = {
        token: req.headers.authorization as string,
        idToEdit: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userBusiness.editUser(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
}
