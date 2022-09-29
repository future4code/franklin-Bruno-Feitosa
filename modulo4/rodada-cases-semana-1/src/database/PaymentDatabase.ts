import {
  IPaymentInputDTO,
  IPaymentInputDTODB,
  Payment,
} from "../models/Payment";
import { BaseDatabase } from "./BaseDatabase";

export class PaymentDatabase extends BaseDatabase {
  public static TABLE_PAYMENT = "Wirecard_Payment";
  public static TABLE_CARD = "Wirecard_Card";
  public static TABLE_BUYER = "Wirecard_Buyer";

  public toPaymentDBModel = (id: string, paymentInputDB: IPaymentInputDTO) => {
    const paymentDb = {
      payment_id: id,
      amount: paymentInputDB.amount,
      type: paymentInputDB.type,
      // payment_card_number: paymentInputDB.card.cardNumber,
    };

    return paymentDb;
  };

  public createPaymentDB = async (
    paymentInputDB: IPaymentInputDTODB
  ): Promise<void> => {
    const paymentDb = this.toPaymentDBModel(
      paymentInputDB.id,
      paymentInputDB.payment
    );
    await BaseDatabase.connection(PaymentDatabase.TABLE_PAYMENT).insert(
      paymentDb
    );
  };

  public getBuyerById = async (buyerId: string) => {
    const result = await BaseDatabase.connection(PaymentDatabase.TABLE_BUYER)
      .select("*")
      .where("buyer_id", buyerId);

    return result[0];
  };
}
