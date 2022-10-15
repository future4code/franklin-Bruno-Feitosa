import { CardDatabase } from "../database/CardDatabase";
import {
  Card,
  ICardInputDTO,
  ICardInputDTODB,
  IGetSingleCardInputDTO,
} from "../models/Card";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LuhnCheckAlgorithm } from "../services/LuhnCheckAlgorithm";

export class CardBusiness {
  constructor(
    protected CardDatabase: CardDatabase,
    protected HashManager: HashManager,
    protected Authenticator: Authenticator,
    protected IdGenerator: IdGenerator,
    protected LuhnCheckAlgorithm: LuhnCheckAlgorithm
  ) {}

  public registerCard = async (input: ICardInputDTO, token: string) => {
    const cardNumber = input.cardNumber;
    const cardHolderName = input.cardHolderName;
    const cardExpirationDate = input.cardExpirationDate;
    const cardCVV = input.cardCVV;

    if (!cardNumber || !cardHolderName || !cardExpirationDate || !cardCVV) {
      throw new Error("Missing parameters");
    }

    if (String(cardCVV).length !== 3) {
      throw new Error("Invalid CVV");
    }

    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Invalid Token");
    }

    const isValidCard = await this.LuhnCheckAlgorithm.luhnCheckAlgorithm(
      cardNumber
    );

    if (!isValidCard.checkValidCard) {
      throw new Error("Invalid Card");
    }

    const buyerInfo = await this.CardDatabase.getBuyerById(tokenInfo.id);

    if (!buyerInfo) {
      throw new Error("User not found");
    }

    const cardExistForThisBuyer =
      await this.CardDatabase.getCardByBuyerIdCardNumber(
        buyerInfo.buyerId,
        cardNumber
      );

    if (cardExistForThisBuyer) {
      throw new Error("Card already registered");
    }

    const cardNumberAlreadyExists = await this.CardDatabase.getCardByCardNumber(
      cardNumber
    );

    if (cardNumberAlreadyExists) {
      throw new Error("Card already registered by another user");
    }

    const card = new Card(
      cardNumber,
      cardHolderName,
      cardExpirationDate,
      cardCVV,
      isValidCard.creditCardIssuer
    );

    const cardInputDB: ICardInputDTODB = {
      buyer_id: buyerInfo.buyerId,
      card,
    };

    await this.CardDatabase.createCardDB(cardInputDB);

    let response = { message: "Card registered successfully" };

    return response;
  };

  public allCards = async (token: string) => {
    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Invalid Token");
    }

    const cards = await this.CardDatabase.getCardsByBuyerId(tokenInfo.id);

    const cardsList = cards.map((card) => {
      return {
        cardNumber: card.cardNumber,
        cardHolderName: card.cardHolderName,
        cardIssuer: card.cardIssuer,
      };
    });

    const response = { cardsList: cardsList };

    return response;
  };

  public getSingleCard = async (input: IGetSingleCardInputDTO) => {
    const token = input.token;
    const cardNumber = input.cardNumber;

    if (!cardNumber) {
      throw new Error("Missing parameter");
    }

    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Invalid Token");
    }

    const buyerCard = await this.CardDatabase.getCardByBuyerIdCardNumber(
      tokenInfo.id,
      cardNumber
    );

    if (!buyerCard) {
      throw new Error("Card not found");
    }

    const response = { CardInfo: buyerCard };

    return response;
  };

  public deleteCard = async (input: IGetSingleCardInputDTO) => {
    const token = input.token;
    const cardNumber = input.cardNumber;

    if (!cardNumber) {
      throw new Error("Missing parameter");
    }

    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Invalid Token");
    }

    const buyerCardNumber = await this.CardDatabase.getCardByBuyerIdCardNumber(
      tokenInfo.id,
      cardNumber
    );

    if (!buyerCardNumber) {
      throw new Error("Card not found");
    }

    const paymentWithCardNumber =
      await this.CardDatabase.getPaymentByCardNumber(cardNumber);

    if (paymentWithCardNumber)
      await this.CardDatabase.deletePaymentDB(cardNumber);

    await this.CardDatabase.deleteCardDB(buyerCardNumber.cardNumber);

    const response = { message: "Card deleted successfully" };

    return response;
  };
}
