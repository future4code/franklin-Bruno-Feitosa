import { BuyerDatabase } from "../database/BuyerDatabase";
import {
  Buyer,
  IBuyersInfoInputDTO,
  ICreateBuyerInputDTO,
  ICreateBuyerInputDTODB,
  ILoginInputDTO,
} from "../models/Buyer";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

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

    if (!checkBuyerExists) {
      throw new Error("User already exists");
    }

    if (checkBuyerExists.cpf === cpf) {
      throw new Error("Cpf already registered");
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

  public buyerInfo = async (token: string) => {
    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Unauthorized");
    }

    const buyerInfo = await this.BuyerDatabase.getAllBuyers();

    if (!buyerInfo) {
      throw new Error("User not found");
    }

    const buyersList = buyerInfo.map((buyer) => {
      return buyer;
    });

    let response = { Buyers: buyersList };

    return response;
  };

  public buyerInfoById = async (input: IBuyersInfoInputDTO) => {
    const buyerId = input.buyerId;
    const token = input.token;

    if (!buyerId) {
      throw new Error("Invalid Parameter");
    }

    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Unauthorized");
    }

    const buyerInfo = await this.BuyerDatabase.getBuyerById(tokenInfo.id);

    if (!buyerInfo) {
      throw new Error("User not found");
    }

    let response = { BuyerInfo: buyerInfo };

    return response;
  };

  public deleteBuyer = async (input: IBuyersInfoInputDTO) => {
    const buyerId = input.buyerId;
    const token = input.token;

    if (!buyerId) {
      throw new Error("Invalid Parameter");
    }

    if (!token) {
      throw new Error("Bad request");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Unauthorized");
    }

    if (tokenInfo.id === buyerId) {
      throw new Error("You can't delete your account");
    }

    const payments = await this.BuyerDatabase.getPaymentsByBuyerId(buyerId);

    if (payments)
      payments.forEach(async (payment) => {
        await this.BuyerDatabase.deletePaymentDB(payment.buyerId);
      });

    const cards = await this.BuyerDatabase.getCardsByBuyerId(buyerId);

    if (cards)
      cards.forEach(async (card) => {
        await this.BuyerDatabase.deleteCardDB(card.buyerId);
      });

    const buyerInfo = await this.BuyerDatabase.getBuyerById(buyerId);

    if (!buyerInfo) {
      throw new Error("User not found");
    }

    await this.BuyerDatabase.deleteBuyerDB(buyerId);

    let response = { message: "User deleted successfully" };

    return response;
  };
}
