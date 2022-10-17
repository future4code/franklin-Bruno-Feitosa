import { Request, Response } from "express";
import { BuyerBusiness } from "../business/BuyerBusiness";
import { ErrorHandler } from "../errors/ErrorHandler";
import {
  IBuyersInfoInputDTO,
  ICreateBuyerInputDTO,
  IEditUserInputDTO,
  IEditUserPasswordInputDTO,
  ILoginInputDTO,
} from "../models/Buyer";

export class BuyerController {
  constructor(protected BuyerBusiness: BuyerBusiness) {}

  public createBuyer = async (req: Request, res: Response) => {
    try {
      const input: ICreateBuyerInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpf: req.body.cpf,
      };

      const response = await this.BuyerBusiness.createBuyer(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
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

      const response = await this.BuyerBusiness.login(input);

      res.status(200).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public buyerInfo = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const response = await this.BuyerBusiness.buyerInfo(token);

      res.status(200).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public buyerInfoById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const buyerId = req.params.buyerId as string;

      const input: IBuyersInfoInputDTO = {
        buyerId,
        token,
      };
      const response = await this.BuyerBusiness.buyerInfoById(input);

      res.status(200).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public editUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const name = req.body.name as string | undefined;
      const email = req.body.email as string | undefined;

      const input: IEditUserInputDTO = {
        token,
        name,
        email,
      };
      const response = await this.BuyerBusiness.editUser(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public editUserPassword = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const previousPassword = req.body.previousPassword as string;
      const newPassword = req.body.newPassword as string;

      const input: IEditUserPasswordInputDTO = {
        token,
        previousPassword,
        newPassword,
      };
      const response = await this.BuyerBusiness.editUserPassword(input);

      res.status(202).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public deleteBuyer = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const buyerId = req.params.buyerId as string;

      const input: IBuyersInfoInputDTO = {
        buyerId,
        token,
      };
      const response = await this.BuyerBusiness.deleteBuyer(input);

      res.status(200).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
