import { ICreateBuyerInputDTODB, IGetBuyerOutputDTODB } from "../models/Buyer";
import { ICardInputDTODB, ICardOutputDTODB } from "../models/Card";
import { IPaymentStatusOutputDTODB } from "../models/Payment";
import { BaseDatabase } from "./BaseDatabase";

export class CardDatabase extends BaseDatabase {
  public static TABLE_PAYMENT = "Wirecard_Payment";
  public static TABLE_CARD = "Wirecard_Card";
  public static TABLE_BUYER = "Wirecard_Buyer";

  public toCardDBModel = (cardInputDB: ICardInputDTODB) => {
    const cardDb = {
      card_number: cardInputDB.card.getCardNumber(),
      card_holder_name: cardInputDB.card.getCardHolderName(),
      card_expiration_date: cardInputDB.card.getCardExpirationDate(),
      card_cvv: cardInputDB.card.getCardCVV(),
      card_issuer: cardInputDB.card.getCardIssuer(),
      buyer_id: cardInputDB.buyer_id,
    };

    return cardDb;
  };

  public getCardByCardNumber = async (
    cardNumber: string
  ): Promise<ICardOutputDTODB> => {
    const result = await BaseDatabase.connection(CardDatabase.TABLE_CARD)
      .select(
        "card_holder_name as cardHolderName",
        "card_issuer as cardIssuer",
        "buyer_id as buyerId"
      )
      .where(`${CardDatabase.TABLE_CARD}.card_number`, cardNumber);

    return result[0];
  };

  public getBuyerByEmail = async (
    email: string
  ): Promise<IGetBuyerOutputDTODB> => {
    const result: IGetBuyerOutputDTODB[] = await BaseDatabase.connection(
      CardDatabase.TABLE_BUYER
    )
      .select(
        "buyer_id as buyerId",
        "buyer_name as buyerName",
        "email",
        "password",
        "cpf"
      )
      .where({ email });

    return result[0];
  };
  public getBuyerById = async (
    buyerId: string
  ): Promise<IGetBuyerOutputDTODB> => {
    const result: IGetBuyerOutputDTODB[] = await BaseDatabase.connection(
      CardDatabase.TABLE_BUYER
    )
      .select(
        "buyer_id as buyerId",
        "buyer_name as buyerName",
        "email",
        "password",
        "cpf"
      )
      .where("buyer_id", buyerId);

    return result[0];
  };

  public getCardByBuyerIdCardNumber = async (
    buyerId: string,
    cardNumber: string
  ): Promise<ICardOutputDTODB> => {
    const result: ICardOutputDTODB[] = await BaseDatabase.connection(
      CardDatabase.TABLE_CARD
    )
      .select(
        "card_number as cardNumber",
        "card_holder_name as cardHolderName",
        "card_expiration_date as cardExpirationDate",
        "card_CVV as cardCVV",
        "card_issuer as cardIssuer",
        "buyer_id as buyerId"
      )
      .where("buyer_id", buyerId)
      .andWhere("card_number", cardNumber);

    return result[0];
  };

  public getCardsByBuyerId = async (
    buyerId: string
  ): Promise<ICardOutputDTODB[]> => {
    const result: ICardOutputDTODB[] = await BaseDatabase.connection(
      CardDatabase.TABLE_CARD
    )
      .select(
        "card_number as cardNumber",
        "card_holder_name as cardHolderName",
        "card_issuer as cardIssuer"
      )
      .where("buyer_id", buyerId);

    return result;
  };

  public getPaymentByCardNumber = async (
    cardNumber: string
  ): Promise<IPaymentStatusOutputDTODB[]> => {
    const result = await BaseDatabase.connection(CardDatabase.TABLE_PAYMENT)
      .select(
        "payment_id as paymentId",
        "buyer_id as buyerId",
        "amount",
        "status",
        "payment_date as paymentDate",
        "type"
      )
      .where(`${CardDatabase.TABLE_PAYMENT}.payment_id`, cardNumber);

    return result;
  };

  public createCardDB = async (cardInputDB: ICardInputDTODB): Promise<void> => {
    const cardDb = this.toCardDBModel(cardInputDB);
    await BaseDatabase.connection(CardDatabase.TABLE_CARD).insert(cardDb);
  };

  public deleteCardDB = async (cardNumber: string): Promise<void> => {
    await BaseDatabase.connection(CardDatabase.TABLE_CARD)
      .delete()
      .where("card_number", cardNumber);
  };

  public deletePaymentDB = async (cardNumber: string): Promise<void> => {
    await BaseDatabase.connection(CardDatabase.TABLE_PAYMENT)
      .delete()
      .where("buyer_id", cardNumber);
  };
}
