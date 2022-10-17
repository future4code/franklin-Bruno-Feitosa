import { PaymentDatabase } from "../database/PaymentDatabase";
import { ErrorHandler } from "../errors/ErrorHandler";

import {
  IPaymentInputDTO,
  IPaymentInputDTODB,
  IPaymentStatusInputDTO,
  Payment,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
} from "../models/Payment";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PaymentBusiness {
  constructor(
    protected PaymentDatabase: PaymentDatabase,
    protected Authenticator: Authenticator,
    protected IdGenerator: IdGenerator
  ) {}

  public createPayment = async (input: IPaymentInputDTO, token: string) => {
    const amount = input.amount;
    const type = input.type;
    const cardNumber = input.cardNumber;
    let response = { message: "" };

    if (!amount || !type) {
      throw new ErrorHandler("Invalid Parameters", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const buyerInfo = await this.PaymentDatabase.getBuyerById(tokenInfo.id);

    if (!buyerInfo) {
      throw new ErrorHandler("User not found", 404);
    }

    const paymentId: string = this.IdGenerator.generate();
    const paymentDate: Date = new Date();

    if (!cardNumber && type === PAYMENT_TYPE.BOLETO) {
      const payment = new Payment(
        amount,
        type,
        PAYMENT_STATUS.PENDENTE,
        undefined,
        paymentDate
      );

      const paymentInputDB: IPaymentInputDTODB = {
        payment_id: paymentId,
        buyer_id: buyerInfo.buyerId,
        payment,
      };

      await this.PaymentDatabase.createPaymentDB(paymentInputDB);

      response = { ...response, message: "Código do boleto" };
      return response;
    }

    if (cardNumber && type !== PAYMENT_TYPE.CREDIT_CARD) {
      throw new ErrorHandler(
        "Shouldn't put Card info if payment type isn't credit card",
        400
      );
    }

    if (!cardNumber) {
      throw new ErrorHandler("Invalid Card", 400);
    }

    const cardInfo = await this.PaymentDatabase.getCardByCardNumber(cardNumber);

    if (!cardInfo) {
      throw new ErrorHandler("Card not found", 404);
    }

    if (buyerInfo.buyerId !== cardInfo.buyerId) {
      throw new ErrorHandler("Card not found", 404);
    }

    const payment = new Payment(
      amount,
      type,
      PAYMENT_STATUS.PENDENTE,
      cardInfo.cardNumber,
      paymentDate
    );

    const paymentInputDB: IPaymentInputDTODB = {
      payment_id: paymentId,
      buyer_id: buyerInfo.buyerId,
      payment,
    };

    await this.PaymentDatabase.createPaymentDB(paymentInputDB);

    response = {
      ...response,
      message: "Payment was successfully made",
    };

    return response;
  };

  public allPayments = async (token: string) => {
    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const payments = await this.PaymentDatabase.getPaymentsByBuyerId(
      tokenInfo.id
    );

    const paymentsList = payments.map((payment) => {
      return {
        paymentId: payment.paymentId,
        paymentValue: payment.amount,
        paymentType: payment.type,
        buyerId: payment.buyerId,
      };
    });

    const response = { paymentsList: paymentsList };

    return response;
  };

  public singlePaymentStatus = async (input: IPaymentStatusInputDTO) => {
    const paymentId = input.paymentId;
    const token = input.token;

    if (!paymentId) {
      throw new ErrorHandler("Missing parameter", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const payment = await this.PaymentDatabase.getPaymentByPaymentId(
      tokenInfo.id,
      paymentId
    );

    if (!payment) {
      throw new ErrorHandler("Payment didn't exist", 404);
    }

    const response = { Payment: payment };

    return response;
  };

  public deletePayment = async (input: IPaymentStatusInputDTO) => {
    const token = input.token;
    const paymentId = input.paymentId;

    if (!paymentId) {
      throw new ErrorHandler("Missing parameter", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const buyer = await this.PaymentDatabase.getBuyerById(tokenInfo.id);

    if (!buyer) {
      throw new ErrorHandler("User not found", 404);
    }

    const payment = await this.PaymentDatabase.getPaymentByPaymentId(
      buyer.buyerId,
      paymentId
    );

    if (!payment) {
      throw new ErrorHandler("Payment didn't exist", 404);
    }

    await this.PaymentDatabase.deletePaymentDB(buyer.buyerId, paymentId);

    const response = { message: "Payment deleted successfully" };

    return response;
  };
}
