import { UserDatabase } from "../database/UserDatabase";
import { ISignupInputDTO } from "../models/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  constructor(
    protected UserDatabase: UserDatabase,
    protected Authenticator: Authenticator,
    protected HashManager: HashManager,
    protected IdGenerator: IdGenerator
  ) {}

  public signup = async (input: ISignupInputDTO) => {};
}
