import { ICardOutputDTODB } from "../models/Card";
import {
  IPaymentInputDTO,
  IPaymentInputDTODB,
  IPaymentStatusOutputDTODB,
  Payment,
} from "../models/Payment";
import { BaseDatabase } from "./BaseDatabase";

export class PaymentDatabase extends BaseDatabase {
  public static TABLE_PAYMENT = "Wirecard_Payment";
  public static TABLE_CARD = "Wirecard_Card";
  public static TABLE_BUYER = "Wirecard_Buyer";

  public toPaymentDBModel = (paymentInputDB: IPaymentInputDTODB) => {
    const paymentDb = {
      payment_id: paymentInputDB.payment_id,
      buyer_id: paymentInputDB.buyer_id,
      amount: paymentInputDB.payment.getAmount(),
      type: paymentInputDB.payment.getType(),
      status: paymentInputDB.payment.getPaymentStatus(),
      card_number: paymentInputDB.payment.getCardNumber(),
      payment_date: paymentInputDB.payment.getPaymentDate().toLocaleString(),
    };

    return paymentDb;
  };

  public createPaymentDB = async (
    paymentInputDB: IPaymentInputDTODB
  ): Promise<void> => {
    const paymentDb = this.toPaymentDBModel(paymentInputDB);
    await BaseDatabase.connection(PaymentDatabase.TABLE_PAYMENT).insert(
      paymentDb
    );
  };

  public getBuyerById = async (buyerId: string) => {
    const result = await BaseDatabase.connection(PaymentDatabase.TABLE_BUYER)
      .join(
        `${PaymentDatabase.TABLE_CARD}`,
        `${PaymentDatabase.TABLE_CARD}.buyer_id`,
        "=",
        `${PaymentDatabase.TABLE_BUYER}.buyer_id`
      )
      .select(
        `${PaymentDatabase.TABLE_BUYER}.buyer_id as buyerId`,
        `${PaymentDatabase.TABLE_CARD}.buyer_id as buyerId`,
        "buyer_name as buyerName",
        "card_CVV as cardCVV",
        "card_issuer as cardIssuer",
        "card_expiration_date as cardExpirationDate",
        "card_holder_name as cardHolderName",
        "card_number as cardNumber",
        "cpf",
        "email"
      )
      .where(`${PaymentDatabase.TABLE_BUYER}.buyer_id`, buyerId);

    return result[0];
  };

  public getPaymentsByBuyerId = async (
    buyerId: string
  ): Promise<IPaymentStatusOutputDTODB[]> => {
    const result = await BaseDatabase.connection(PaymentDatabase.TABLE_PAYMENT)
      .select(
        "payment_id as paymentId",
        "buyer_id as buyerId",
        "amount",
        "type",
        "status",
        "payment_date as paymentDate"
      )
      .where(`${PaymentDatabase.TABLE_PAYMENT}.buyer_id`, buyerId);

    return result;
  };

  public getPaymentByBuyerId = async (
    buyerId: string
  ): Promise<IPaymentStatusOutputDTODB[]> => {
    const result = await BaseDatabase.connection(PaymentDatabase.TABLE_PAYMENT)
      .select(
        "payment_id as paymentId",
        "buyer_id as buyerId",
        "amount",
        "type",
        "status",
        "payment_date as paymentDate"
      )
      .where(`${PaymentDatabase.TABLE_PAYMENT}.buyer_id`, buyerId);

    return result[0];
  };

  public getPaymentByPaymentId = async (
    buyerId: string,
    paymentId: string
  ): Promise<IPaymentStatusOutputDTODB[]> => {
    const result = await BaseDatabase.connection(PaymentDatabase.TABLE_PAYMENT)
      .select(
        "payment_id as paymentId",
        "buyer_id as buyerId",
        "amount",
        "type",
        "status",
        "card_number as cardNumber",
        "payment_date as paymentDate"
      )
      .where(`${PaymentDatabase.TABLE_PAYMENT}.buyer_id`, buyerId)
      .andWhere(`${PaymentDatabase.TABLE_PAYMENT}.payment_id`, paymentId);

    return result[0];
  };

  public getCardByCardNumber = async (
    cardNumber: string
  ): Promise<ICardOutputDTODB> => {
    const result = await BaseDatabase.connection(PaymentDatabase.TABLE_CARD)
      .select(
        "card_number as cardNumber",
        "card_holder_name as cardHolderName",
        "card_expiration_date as cardExpirationDate",
        "card_CVV as cardCVV",
        "card_issuer as cardIssuer",
        "buyer_id as buyerId"
      )
      .where(`${PaymentDatabase.TABLE_CARD}.card_number`, cardNumber);

    return result[0];
  };

  public deletePaymentDB = async (
    buyerId: string,
    paymentId: string
  ): Promise<void> => {
    await BaseDatabase.connection(PaymentDatabase.TABLE_PAYMENT)
      .delete()
      .where("buyer_id", buyerId)
      .andWhere("payment_id", paymentId);
  };
}
