import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ILoginInputDTO, ISignupInputDTO, USER_ROLES } from "../models/User";

export class UserController {
  constructor(protected userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const input: ISignupInputDTO = {
        name: req.body.name as string,
        email: req.body.email as string,
        password: req.body.password as string,
      };

      const response = await this.userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input: ILoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userBusiness.login(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public getInfo = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const response = await this.userBusiness.getInfo(token);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
