import { IUserDB, User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export default class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Arq_Users";

  public toUserDBModel = (user: User) => {
    const userDB: IUserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
    };

    return userDB;
  };

  public getUserByEmail = async (email: string) => {
    const user = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .select("*")
      .where({
        email,
      });

    return user[0];
  };

  public searchUserById = async (id: string) => {
    const user: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select("*")
      .where({
        id,
      });

    return user[0];
  };

  public createUser = async (user: User) => {
    const userDB = this.toUserDBModel(user);

    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB);
  };

  public getAllUserFromDb = async () => {
    const user = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select(
      "*"
    );
    return user;
  };

  public deleteUserFromDb = async (id: string) => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id });
  };
}
