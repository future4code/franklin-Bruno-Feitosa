import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import {
  IDeleteUserInputDTO,
  IFollowInputDTO,
  IGetInfoInputDTO,
  ILoginInputDTO,
  ISignupInputDTO,
  IUnfollowInputDTO,
} from "../models/User";

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

  public getInfoById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id as string;

      const input: IGetInfoInputDTO = {
        token,
        id,
      };
      const response = await this.userBusiness.getInfoById(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public follow = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const idToFollow = req.body.idToFollow as string;

      const input: IFollowInputDTO = { token, idToFollow };

      const response = await this.userBusiness.follow(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public unfollow = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const idToUnfollow = req.body.idToUnfollow as string;

      const input: IUnfollowInputDTO = { token, idToUnfollow };

      const response = await this.userBusiness.unfollow(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public feed = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const response = await this.userBusiness.feed(token);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id as string;

      const input: IDeleteUserInputDTO = {
        token,
        id,
      };
      const response = await this.userBusiness.deleteUser(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
