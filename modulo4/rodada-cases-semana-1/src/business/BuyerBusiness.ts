import { BuyerDatabase } from "../database/BuyerDatabase";
import { ErrorHandler } from "../errors/ErrorHandler";
import {
  Buyer,
  IBuyersInfoInputDTO,
  ICreateBuyerInputDTO,
  ICreateBuyerInputDTODB,
  IEditUserBothPropertiesInputDTODB,
  IEditUserEmailInputDTODB,
  IEditUserInputDTO,
  IEditUserNamelInputDTODB,
  IEditUserPasswordInputDTO,
  IEditUserPasswordInputDTODB,
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
      throw new ErrorHandler("Invalid Parameters", 400);
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new ErrorHandler("Invalid 'name' Parameter", 400);
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new ErrorHandler("Invalid 'email' Parameter", 400);
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new ErrorHandler("Invalid 'password' Parameter", 400);
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new ErrorHandler("Invalid 'email' Parameter", 400);
    }

    if (typeof cpf !== "string" || cpf.length !== 11) {
      throw new ErrorHandler("Invalid 'cpf' Parameter", 400);
    }

    const checkBuyerExists = await this.BuyerDatabase.getBuyerByEmail(email);

    if (!checkBuyerExists) {
      throw new ErrorHandler("User already exists", 400);
    }

    if (checkBuyerExists.cpf === cpf) {
      throw new ErrorHandler("Cpf already registered", 400);
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

    if (!email || !password) {
      throw new ErrorHandler("Invalid Parameters", 400);
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new ErrorHandler("Invalid 'email' Parameter", 400);
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new ErrorHandler("Invalid 'password' Parameter", 400);
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new ErrorHandler("Invalid 'email' Parameter", 400);
    }

    const buyer = await this.BuyerDatabase.getBuyerByEmail(email);

    if (!buyer) {
      throw new ErrorHandler("User not found", 404);
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
      throw new ErrorHandler("Invalid Password", 401);
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
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const buyerInfo = await this.BuyerDatabase.getAllBuyers();

    if (!buyerInfo) {
      throw new ErrorHandler("User not found", 404);
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

    if (!buyerId || buyerId.length === 0) {
      throw new ErrorHandler("Invalid Parameter", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    if (buyerId !== tokenInfo.id) {
      throw new ErrorHandler("Bad Request", 400);
    }

    const buyerInfo = await this.BuyerDatabase.getBuyerById(buyerId);

    if (!buyerInfo) {
      throw new ErrorHandler("User not found", 404);
    }

    let response = { BuyerInfo: buyerInfo };

    return response;
  };

  public editUser = async (input: IEditUserInputDTO) => {
    const token = input.token;
    const name = input.name;
    const email = input.email;
    let checkIfPropertyExists: string = "";

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    if (!name && !email) {
      throw new ErrorHandler("Bad Request", 400);
    }

    if (typeof name !== "string" || (name.length < 3 && name)) {
      throw new ErrorHandler("Invalid 'name' Parameter", 400);
    }

    if (typeof email !== "string" || (email.length < 3 && email)) {
      throw new ErrorHandler("Invalid 'email' Parameter", 400);
    }

    if (
      email &&
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new ErrorHandler("Invalid 'email' Parameter", 400);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const buyer = await this.BuyerDatabase.getBuyerById(tokenInfo.id);

    if (!buyer) {
      throw new ErrorHandler("User not found", 404);
    }

    if (buyer.buyerName === name || buyer.email === email) {
      throw new ErrorHandler(
        "The new field cannot be the same as the previous one",
        400
      );
    }

    if (name && email) {
      checkIfPropertyExists = "name and email";
    } else {
      if (name) checkIfPropertyExists = "name";
      if (email) checkIfPropertyExists = "email";
    }

    switch (checkIfPropertyExists) {
      case "name":
        const inputDataName: IEditUserNamelInputDTODB = {
          buyerId: buyer.buyerId,
          name,
        };
        await this.BuyerDatabase.editBuyerNameDB(inputDataName);
        break;
      case "email":
        const inputDataEmail: IEditUserEmailInputDTODB = {
          buyerId: buyer.buyerId,
          email,
        };
        await this.BuyerDatabase.editBuyerEmailDB(inputDataEmail);
        break;
      case "name and email":
        const inputDataBothDB: IEditUserBothPropertiesInputDTODB = {
          name,
          email,
        };
        await this.BuyerDatabase.editBothPropertiesBuyerDB(
          buyer.buyerId,
          inputDataBothDB
        );
        break;
    }

    const response = { message: "User edited successfully" };

    return response;
  };

  public editUserPassword = async (input: IEditUserPasswordInputDTO) => {
    const token = input.token;
    const previousPassword = input.previousPassword;
    const newPassword = input.newPassword;

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    if (!previousPassword || !newPassword) {
      throw new ErrorHandler("Bad Request", 400);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const buyer = await this.BuyerDatabase.getBuyerById(tokenInfo.id);

    if (!buyer) {
      throw new ErrorHandler("User not found", 404);
    }

    const comparedPasswords = await this.HashManager.compare(
      previousPassword,
      buyer.password
    );

    if (!comparedPasswords) {
      throw new ErrorHandler("Invalid Password", 401);
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      throw new ErrorHandler("Invalid 'password' Parameter", 400);
    }

    const hashedPassword = await this.HashManager.hash(newPassword);

    if (hashedPassword === buyer.password) {
      throw new ErrorHandler(
        "The new password cannot be the same as the previous one",
        400
      );
    }

    const inputPasswordDB: IEditUserPasswordInputDTODB = {
      buyerId: buyer.buyerId,
      password: hashedPassword,
    };

    await this.BuyerDatabase.editBuyerPasswordDB(inputPasswordDB);
    const response = { message: "User password edited successfully" };

    return response;
  };

  public deleteBuyer = async (input: IBuyersInfoInputDTO) => {
    const buyerId = input.buyerId;
    const token = input.token;

    if (!buyerId) {
      throw new ErrorHandler("Invalid Parameter", 400);
    }

    if (!token) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new ErrorHandler("Invalid Token", 401);
    }

    if (tokenInfo.id === buyerId) {
      throw new ErrorHandler("You can't delete your own account", 403);
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
      throw new ErrorHandler("User not found", 404);
    }

    await this.BuyerDatabase.deleteBuyerDB(buyerId);

    let response = { message: "User deleted successfully" };

    return response;
  };
}
