import { IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Cookenu_Users";

  public toUserDBModel = (user: User): IUserDB => {
    const userDb: IUserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
    };

    return userDb;
  };

  public createUser = async (user: User): Promise<void> => {
    const userDb = this.toUserDBModel(user);
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDb);
  };

  public getUserByEmail = async (email: string): Promise<IUserDB> => {
    const result: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select("*")
      .where({ email });

    return result[0];
  };

  public getUserById = async (id: string): Promise<IUserDB> => {
    const result: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select("*")
      .where({ id });

    return result[0];
  };
}
