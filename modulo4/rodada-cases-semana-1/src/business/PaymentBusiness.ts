import { PaymentDatabase } from "../database/PaymentDatabase";

import {
  IPaymentInputDTO,
  IPaymentInputDTODB,
  IPaymentStatusInputDTO,
  IPaymentStatusOutputDTODB,
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
    let response: Object = { message: "" };

    if (!amount || !type) {
      throw new Error("Invalid Parameters");
    }
    if (!cardNumber && type !== PAYMENT_TYPE.BOLETO) {
      throw new Error("Invalid Card");
    }

    if (type === PAYMENT_TYPE.BOLETO) {
      if (!token) {
        throw new Error("Bad request");
      }

      const tokenInfo = await this.Authenticator.getTokenPayload(token);

      if (!tokenInfo) {
        throw new Error("Invalid Token");
      }

      const buyerInfo = await this.PaymentDatabase.getBuyerById(tokenInfo.id);

      const paymentId: string = this.IdGenerator.generate();
      const paymentDate: Date = new Date();

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
      throw new Error(
        "Shouldn't put Card info if payment type isn't credit card"
      );
    }

    if (type !== PAYMENT_TYPE.CREDIT_CARD) {
      throw new Error("Invalid Payment Type");
    }

    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Unauthorized");
    }

    const buyerInfo = await this.PaymentDatabase.getBuyerById(tokenInfo.id);

    if (!buyerInfo) {
      throw new Error("User not found");
    }

    const cardInfo = await this.PaymentDatabase.getCardByCardNumber(cardNumber);

    if (!cardInfo) {
      throw new Error("Invalid Card");
    }

    // const checkIfPaymentExist = await this.PaymentDatabase.getPaymentByBuyerId(
    //   buyerId
    // );

    // if (checkIfPaymentExist) {
    //   throw new Error("Payment already been done");
    // }

    const paymentId: string = this.IdGenerator.generate();
    const paymentDate = new Date();

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
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Invalid Token");
    }

    const payments = await this.PaymentDatabase.getPaymentsByBuyerId(
      tokenInfo.id
    );

    const paymentsList = payments.map((payment) => {
      return {
        paymentId: payment.paymentId,
        paymentValue: payment.amount,
        paymentType: payment.type,
      };
    });

    const response = paymentsList;

    return response;
  };

  public checkPaymentStatus = async (input: IPaymentStatusInputDTO) => {
    const token = input.token;
    const paymentId = input.paymentId;

    if (!paymentId) {
      throw new Error("Missing parameter");
    }

    if (!token) {
      throw new Error("Unauthorized");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Invalid Token");
    }

    const payment = await this.PaymentDatabase.getPaymentByPaymentId(
      tokenInfo.id,
      paymentId
    );

    if (!payment) {
      throw new Error("Payment didn't exist");
    }

    const response = { Payment: payment };

    return response;
  };

  public deletePayment = async (input: IPaymentStatusInputDTO) => {
    const token = input.token;
    const paymentId = input.paymentId;

    if (!paymentId) {
      throw new Error("Missing parameter");
    }

    if (!token) {
      throw new Error("Unauthorized");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Invalid Token");
    }

    const buyer = await this.PaymentDatabase.getBuyerById(tokenInfo.id);

    if (!buyer) {
      throw new Error("User not found");
    }

    const payment = await this.PaymentDatabase.getPaymentByPaymentId(
      buyer.buyerId,
      paymentId
    );

    if (!payment) {
      throw new Error("Payment didn't exist");
    }

    await this.PaymentDatabase.deletePaymentDB(buyer.buyerId, paymentId);

    const response = { message: "Payment deleted successfuly" };

    return response;
  };
}
