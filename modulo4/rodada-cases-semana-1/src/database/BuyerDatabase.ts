import { ICreateBuyerInputDTODB, IGetBuyerOutputDTODB } from "../models/Buyer";
import { ICardInputDTODB, ICardOutputDTODB } from "../models/Card";
import { BaseDatabase } from "./BaseDatabase";

export class BuyerDatabase extends BaseDatabase {
  public static TABLE_PAYMENT = "Wirecard_Payment";
  public static TABLE_CARD = "Wirecard_Card";
  public static TABLE_BUYER = "Wirecard_Buyer";

  public toBuyerDBModel = (buyerInputDB: ICreateBuyerInputDTODB) => {
    const buyerDb = {
      buyer_id: buyerInputDB.buyerId,
      buyer_name: buyerInputDB.buyer.getName(),
      password: buyerInputDB.buyer.getPassword(),
      email: buyerInputDB.buyer.getEmail(),
      cpf: buyerInputDB.buyer.getCpf(),
    };

    return buyerDb;
  };
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

  public createBuyerDB = async (
    buyerInputDB: ICreateBuyerInputDTODB
  ): Promise<void> => {
    const buyerDb = this.toBuyerDBModel(buyerInputDB);
    await BaseDatabase.connection(BuyerDatabase.TABLE_BUYER).insert(buyerDb);
  };

  public getBuyerByIdJoin = async (buyerId: string) => {
    const result = await BaseDatabase.connection(BuyerDatabase.TABLE_BUYER)
      .join(
        `${BuyerDatabase.TABLE_CARD}`,
        `${BuyerDatabase.TABLE_CARD}.buyer_id`,
        "=",
        `${BuyerDatabase.TABLE_BUYER}.buyer_id`
      )
      .select(
        `${BuyerDatabase.TABLE_BUYER}.buyer_id as buyerId`,
        `${BuyerDatabase.TABLE_CARD}.buyer_id as buyerId`,
        "buyer_name as buyerName",
        "card_CVV as cardCVV",
        "card_issuer as cardIssuer",
        "card_expiration_date as cardExpirationDate",
        "card_holder_name as cardHolderName",
        "card_number as cardNumber",
        "email",
        "cpf"
      )
      .where(`${BuyerDatabase.TABLE_BUYER}.buyer_id`, buyerId);

    return result[0];
  };

  public getBuyerByEmail = async (
    email: string
  ): Promise<IGetBuyerOutputDTODB> => {
    const result: IGetBuyerOutputDTODB[] = await BaseDatabase.connection(
      BuyerDatabase.TABLE_BUYER
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
      BuyerDatabase.TABLE_BUYER
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

  public getCardByBuyerId = async (
    buyerId: string,
    cardNumber: string
  ): Promise<ICardOutputDTODB> => {
    const result: ICardOutputDTODB[] = await BaseDatabase.connection(
      BuyerDatabase.TABLE_CARD
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

  public createCardDB = async (cardInputDB: ICardInputDTODB): Promise<void> => {
    const cardDb = this.toCardDBModel(cardInputDB);
    await BaseDatabase.connection(BuyerDatabase.TABLE_CARD).insert(cardDb);
  };
}
