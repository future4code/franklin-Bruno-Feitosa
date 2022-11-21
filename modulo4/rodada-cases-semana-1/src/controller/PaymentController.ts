import { Request, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { ErrorHandler } from "../errors/ErrorHandler";
import {
  IPaymentInputDTO,
  IPaymentStatusInputDTO,
  PAYMENT_TYPE,
} from "../models/Payment";

export class PaymentController {
  constructor(protected PaymentBusiness: PaymentBusiness) {}

  public createPayment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const input: IPaymentInputDTO = {
        amount: Number(req.body.amount),
        type: req.body.type,
        cardNumber: (req.body.cardNumber as string) || undefined,
      };

      const response = await this.PaymentBusiness.createPayment(input, token);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public allPayments = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const response = await this.PaymentBusiness.allPayments(token);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public singlePaymentStatus = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const paymentId = req.params.paymentId as string;

      const input: IPaymentStatusInputDTO = {
        paymentId,
        token,
      };

      const response = await this.PaymentBusiness.singlePaymentStatus(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  public deletePayment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const paymentId = req.params.paymentId as string;

      const input: IPaymentStatusInputDTO = {
        paymentId,
        token,
      };

      const response = await this.PaymentBusiness.deletePayment(input);

      res.status(201).send(response);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.errorCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}
