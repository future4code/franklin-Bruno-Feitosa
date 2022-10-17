import {
  ICreateBuyerInputDTODB,
  IEditUserBothPropertiesInputDTODB,
  IEditUserEmailInputDTODB,
  IEditUserNamelInputDTODB,
  IEditUserPasswordInputDTODB,
  IGetBuyerOutputDTODB,
} from "../models/Buyer";
import { ICardInputDTODB, ICardOutputDTODB } from "../models/Card";
import { IPaymentStatusOutputDTODB } from "../models/Payment";
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

  public getAllBuyers = async (): Promise<IGetBuyerOutputDTODB[]> => {
    const result: IGetBuyerOutputDTODB[] = await BaseDatabase.connection(
      BuyerDatabase.TABLE_BUYER
    ).select("buyer_id as buyerId", "buyer_name as buyerName");

    return result;
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

  public getPaymentsByBuyerId = async (
    buyerId: string
  ): Promise<IPaymentStatusOutputDTODB[]> => {
    const result = await BaseDatabase.connection(BuyerDatabase.TABLE_PAYMENT)
      .select(
        "payment_id as paymentId",
        "buyer_id as buyerId",
        "amount",
        "type",
        "status",
        "payment_date as paymentDate"
      )
      .where(`${BuyerDatabase.TABLE_PAYMENT}.buyer_id`, buyerId);

    return result;
  };

  public getCardsByBuyerId = async (
    buyerId: string
  ): Promise<IPaymentStatusOutputDTODB[]> => {
    const result = await BaseDatabase.connection(BuyerDatabase.TABLE_CARD)
      .select(
        "card_number as cardNumber",
        "card_holder_name as cardHolderName",
        "card_expiration_date as cardExpirationDate",
        "card_CVV as cardCVV",
        "card_issuer as cardIssuer",
        "buyer_id as buyerId"
      )
      .where(`${BuyerDatabase.TABLE_CARD}.buyer_id`, buyerId);

    return result;
  };

  public editBuyerNameDB = async (input: IEditUserNamelInputDTODB) => {
    await BaseDatabase.connection(BuyerDatabase.TABLE_BUYER)
      .update({ buyer_name: input.name })
      .where("buyer_id", input.buyerId);
  };

  public editBuyerEmailDB = async (input: IEditUserEmailInputDTODB) => {
    await BaseDatabase.connection(BuyerDatabase.TABLE_BUYER)
      .update({ email: input.email })
      .where("buyer_id", input.buyerId);
  };

  public editBuyerPasswordDB = async (input: IEditUserPasswordInputDTODB) => {
    await BaseDatabase.connection(BuyerDatabase.TABLE_BUYER)
      .update({ password: input.password })
      .where("buyer_id", input.buyerId);
  };

  public editBothPropertiesBuyerDB = async (
    buyerId: string,
    input: IEditUserBothPropertiesInputDTODB
  ) => {
    await BaseDatabase.connection(BuyerDatabase.TABLE_BUYER)
      .update({ email: input.email, buyer_name: input.name })
      .where("buyer_id", buyerId);
  };

  public deleteBuyerDB = async (buyerId: string): Promise<void> => {
    await BaseDatabase.connection(BuyerDatabase.TABLE_BUYER)
      .delete()
      .where("buyer_id", buyerId);
  };

  public deleteCardDB = async (buyerId: string): Promise<void> => {
    await BaseDatabase.connection(BuyerDatabase.TABLE_CARD)
      .delete()
      .where("buyer_id", buyerId);
  };

  public deletePaymentDB = async (buyerId: string): Promise<void> => {
    await BaseDatabase.connection(BuyerDatabase.TABLE_PAYMENT)
      .delete()
      .where("buyer_id", buyerId);
  };
}
