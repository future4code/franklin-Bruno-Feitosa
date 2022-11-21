import { CardDatabase } from "../database/CardDatabase";
import { ErrorHandler } from "../errors/ErrorHandler";
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
      throw new ErrorHandler("Missing parameters", 400);
    }

    if (String(cardCVV).length !== 3) {
      throw new ErrorHandler("Invalid CVV", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const isValidCard = await this.LuhnCheckAlgorithm.luhnCheckAlgorithm(
      cardNumber
    );

    if (!isValidCard.checkValidCard) {
      throw new ErrorHandler("Invalid Card", 406);
    }

    const buyerInfo = await this.CardDatabase.getBuyerById(tokenInfo.id);

    if (!buyerInfo) {
      throw new ErrorHandler("User not found", 404);
    }

    const cardExistForThisBuyer =
      await this.CardDatabase.getCardByBuyerIdCardNumber(
        buyerInfo.buyerId,
        cardNumber
      );

    if (cardExistForThisBuyer) {
      throw new ErrorHandler("Card already registered", 400);
    }

    const cardNumberAlreadyExists = await this.CardDatabase.getCardByCardNumber(
      cardNumber
    );

    if (cardNumberAlreadyExists) {
      throw new ErrorHandler("Card already registered by another user", 400);
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
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
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
      throw new ErrorHandler("Missing parameter", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const buyerCard = await this.CardDatabase.getCardByBuyerIdCardNumber(
      tokenInfo.id,
      cardNumber
    );

    if (!buyerCard) {
      throw new ErrorHandler("Card not found", 404);
    }

    const response = { CardInfo: buyerCard };

    return response;
  };

  public deleteCard = async (input: IGetSingleCardInputDTO) => {
    const token = input.token;
    const cardNumber = input.cardNumber;

    if (!cardNumber) {
      throw new ErrorHandler("Missing parameter", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const buyerCardNumber = await this.CardDatabase.getCardByBuyerIdCardNumber(
      tokenInfo.id,
      cardNumber
    );

    if (!buyerCardNumber) {
      throw new ErrorHandler("Card not found", 404);
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
