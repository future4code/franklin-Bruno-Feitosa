import { Request, Response } from "express";
import { BuyerBusiness } from "../business/BuyerBusiness";
import { ICreateBuyerInputDTO, ILoginInputDTO } from "../models/Buyer";
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

  public registerCard = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const input: ICardInputDTO = {
        cardHolderName: req.body.cardHolderName,
        cardNumber: req.body.cardNumber,
        cardExpirationDate: req.body.cardExpirationDate,
        cardCVV: req.body.cardCVV,
      };

      // const response = await this.BuyerBusiness.registerCard(input, token);

      // res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
