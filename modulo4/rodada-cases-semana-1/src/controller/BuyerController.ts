import { Request, Response } from "express";
import { BuyerBusiness } from "../business/BuyerBusiness";
import {
  IBuyersInfoInputDTO,
  ICreateBuyerInputDTO,
  ILoginInputDTO,
} from "../models/Buyer";
import { ICardInputDTO } from "../models/Card";

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

      const response = await this.BuyerBusiness.login(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public buyerInfo = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const response = await this.BuyerBusiness.buyerInfo(token);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
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

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
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

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
