import { response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import {
  GetInfoOutputDTO,
  ILoginInputDTO,
  ISignupInputDTO,
  User,
  USER_ROLES,
} from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  constructor(
    protected UserDatabase: UserDatabase,
    protected Authenticator: Authenticator,
    protected HashManager: HashManager,
    protected IdGenerator: IdGenerator
  ) {}

  public signup = async (input: ISignupInputDTO) => {
    const name: string = input.name;
    const email: string = input.email;
    const password: string = input.password;

    if (!name || !email || !password) {
      throw new Error("Um ou mais parâmetros faltando");
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new Error("Parâmetro 'name' inválido");
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new Error("Parâmetro 'email' inválido");
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new Error("Parâmetro 'email' inválido");
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new Error("Parâmetro 'password' inválido");
    }

    const findUser = await this.UserDatabase.getUserByEmail(email);

    if (findUser) {
      throw new Error("Email já cadastrado");
    }

    const id = this.IdGenerator.generate();
    const hashPassword = await this.HashManager.hash(password);

    const user = new User(id, name, email, hashPassword, USER_ROLES.NORMAL);

    await this.UserDatabase.createUser(user);

    const payload: ITokenPayload = {
      id: user.getId(),
      role: user.getRole(),
    };

    const token: string = await this.Authenticator.generateToken(payload);

    const response = {
      message: "Cadastro realizado com sucesso",
      accessToken: token,
    };

    return response;
  };

  public login = async (input: ILoginInputDTO) => {
    const email: string = input.email;
    const password: string = input.password;

    if (!email || !password) {
      throw new Error("Um ou mais parâmetros faltando");
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new Error("Parâmetro 'email' inválido");
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new Error("Parâmetro 'email' inválido");
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new Error("Parâmetro 'password' inválido");
    }
    const user = await this.UserDatabase.getUserByEmail(email);

    if (!user) {
      throw new Error("E-mail não cadastrado");
    }

    const userDb = new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role
    );

    const comparedPassword = await this.HashManager.compare(
      password,
      userDb.getPassword()
    );

    if (!comparedPassword) {
      throw new Error("Senha incorreta");
    }

    const payload: ITokenPayload = {
      id: userDb.getId(),
      role: userDb.getRole(),
    };

    const token: string = await this.Authenticator.generateToken(payload);

    const response = {
      message: "Login realizado com sucesso",
      accessToken: token,
    };

    return response;
  };

  public getInfo = async (token: string) => {
    if (!token) {
      throw new Error("Token não informado");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const user = await this.UserDatabase.getUserById(tokenInfo.id);

    const response: GetInfoOutputDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response;
  };

  public getInfoById = async (token: string, id: string) => {
    if (!id) {
      throw new Error("Id não informado");
    }

    if (!token) {
      throw new Error("Token não informado");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const user = await this.UserDatabase.getUserById(id);

    if (!user) {
      throw new Error("Usuário não encontrado com esse id");
    }

    const response: GetInfoOutputDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response;
  };
}
