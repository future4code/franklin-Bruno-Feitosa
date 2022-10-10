import { BuyerDatabase } from "../database/BuyerDatabase";
import {
  Buyer,
  ICreateBuyerInputDTO,
  ICreateBuyerInputDTODB,
  ILoginInputDTO,
} from "../models/Buyer";
import { Card, ICardInputDTO, ICardInputDTODB } from "../models/Card";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LuhnCheckAlgorithm } from "../services/LuhnCheckAlgorithm";

export class BuyerBusiness {
  constructor(
    protected BuyerDatabase: BuyerDatabase,
    protected HashManager: HashManager,
    protected Authenticator: Authenticator,
    protected IdGenerator: IdGenerator
  ) {}

  public createBuyer = async (input: ICreateBuyerInputDTO) => {
    const name = input.name;
    const email = input.email;
    const password = input.password;
    const cpf = input.cpf;

    if (!name || !email || !password || !cpf) {
      throw new Error("Invalid parameters");
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new Error("Invalid 'name' parameter");
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new Error("Invalid 'email' parameter");
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new Error("Invalid 'password' parameter");
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new Error("Invalid 'email' parameter");
    }

    if (typeof cpf !== "string" || cpf.length !== 11) {
      throw new Error("Invalid 'cpf' parameter");
    }

    const checkBuyerExists = await this.BuyerDatabase.getBuyerByEmail(email);

    if (checkBuyerExists) {
      throw new Error("User already exists");
    }

    const buyerId = await this.IdGenerator.generate();
    const hashPassword = await this.HashManager.hash(password);

    const buyer = new Buyer(name, email, hashPassword, cpf);

    const buyerInputDB: ICreateBuyerInputDTODB = {
      buyerId,
      buyer,
    };

    await this.BuyerDatabase.createBuyerDB(buyerInputDB);

    const payload: ITokenPayload = {
      id: buyerId,
    };

    const token = await this.Authenticator.generateToken(payload);

    let response = {
      message: "User registered successfully",
      accessToken: token,
    };

    return response;
  };

  public login = async (input: ILoginInputDTO) => {
    const email = input.email;
    const password = input.password;

    if (typeof email !== "string" || email.length < 3) {
      throw new Error("Invalid 'email' parameter");
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new Error("Invalid 'password' parameter");
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new Error("Invalid 'email' parameter");
    }

    const buyer = await this.BuyerDatabase.getBuyerByEmail(email);

    if (!buyer) {
      throw new Error("User not found");
    }

    const buyerDb = new Buyer(
      buyer.buyerName,
      buyer.email,
      buyer.password,
      buyer.cpf
    );

    const comparedPassword = await this.HashManager.compare(
      password,
      buyerDb.getPassword()
    );

    if (!comparedPassword) {
      throw new Error("Invalid password");
    }

    const payload: ITokenPayload = {
      id: buyer.buyerId,
    };

    const token: string = await this.Authenticator.generateToken(payload);

    let response = { message: "Successfully logged in", accessToken: token };

    return response;
  };

  // public registerCard = async (input: ICardInputDTO, token: string) => {
  //   const cardNumber = input.cardNumber;
  //   const cardHolderName = input.cardHolderName;
  //   const cardExpirationDate = input.cardExpirationDate;
  //   const cardCVV = input.cardCVV;

  //   if (!token) {
  //     throw new Error("Bad request");
  //   }

  //   const tokenInfo = await this.Authenticator.getTokenPayload(token);

  //   if (!tokenInfo) {
  //     throw new Error("Unauthorized");
  //   }

  //   const isValidCard = LuhnCheckAlgorithm(cardNumber);

  //   if (!isValidCard) {
  //     throw new Error("Invalid Card");
  //   }

  //   const buyerInfo = await this.BuyerDatabase.getBuyerById(tokenInfo.id);

  //   const checkIfCardExist = await this.BuyerDatabase.getCardByBuyerId(
  //     buyerInfo.buyerId,
  //     cardNumber
  //   );

  //   if (checkIfCardExist) {
  //     throw new Error("Card already registered");
  //   }

  //   const card = new Card(
  //     cardNumber,
  //     cardHolderName,
  //     cardExpirationDate,
  //     cardCVV,
  //     isValidCard.creditCardIssuer
  //   );

  //   const cardInputDB: ICardInputDTODB = {
  //     buyer_id: buyerInfo.buyerId,
  //     card,
  //   };

  //   await this.BuyerDatabase.createCardDB(cardInputDB);

  //   let response = { message: "Card registered successfully" };

  //   return response;
  // };
}
