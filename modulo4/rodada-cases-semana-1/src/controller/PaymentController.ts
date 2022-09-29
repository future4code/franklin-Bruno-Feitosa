import { Request, response, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { CardInputDTO } from "../models/Card";
import { IPaymentInputDTO, PAYMENT_TYPE } from "../models/Payment";

export class PaymentController {
  constructor(protected PaymentBusiness: PaymentBusiness) {}

  public createPayment = async (req: Request, res: Response) => {
    try {
      const input: IPaymentInputDTO = {
        amount: Number(req.body.amount),
        type: req.body.type,
        card:
          {
            cardHolderName: req.body.card.cardHolderName,
            cardNumber: req.body.card.cardNumber,
            cardExpirationDate: req.body.card.cardExpirationDate,
            cardCVV: req.body.card.cardCVV,
          } || undefined,
      };

      const response = await this.PaymentBusiness.createPayment(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
