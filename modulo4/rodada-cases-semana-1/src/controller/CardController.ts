import { Request, Response } from "express";
import { CardBusiness } from "../business/CardBusiness";
import {
  ICardInputDTO,
  IDeleteCardInputDTO,
  IGetSingleCardInputDTO,
} from "../models/Card";

export class CardController {
  constructor(protected CardBusiness: CardBusiness) {}

  public registerCard = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const input: ICardInputDTO = {
        cardHolderName: req.body.cardHolderName,
        cardNumber: req.body.cardNumber,
        cardExpirationDate: req.body.cardExpirationDate,
        cardCVV: req.body.cardCVV,
      };

      const response = await this.CardBusiness.registerCard(input, token);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public allCards = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const response = await this.CardBusiness.allCards(token);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public singleCard = async (req: Request, res: Response) => {
    try {
      const cardNumber = req.params.cardNumber as string;
      const token = req.headers.authorization as string;

      const input: IGetSingleCardInputDTO = {
        cardNumber,
        token,
      };

      const response = await this.CardBusiness.getSingleCard(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public deleteCard = async (req: Request, res: Response) => {
    try {
      const cardNumber = req.params.cardNumber as string;
      const token = req.headers.authorization as string;

      const input: IDeleteCardInputDTO = {
        cardNumber,
        token,
      };

      const response = await this.CardBusiness.deleteCard(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
