import { IGetUserInputDBDTO, IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Arq2_Users";

  public findByEmail = async (email: string): Promise<IUserDB> => {
    const usersDB: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where({ email });

    return usersDB[0];
  };

  public createUser = async (user: User): Promise<void> => {
    const userDB: IUserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
    };

    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB);
  };

  public getUsers = async (input: IGetUserInputDBDTO): Promise<IUserDB[]> => {
    const search = input.search;
    const order = input.order;
    const sort = input.sort;
    const limit = input.limit;
    const offset = input.offset;

    const usersDB: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where("name", "LIKE", `%${search}%`)
      .orderBy(order, sort)
      .limit(limit)
      .offset(offset);

    return usersDB;
  };

  public findById = async (id: string): Promise<IUserDB> => {
    const usersDB: IUserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where({ id });

    return usersDB[0];
  };

  public deleteUser = async (id: string): Promise<void> => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id });
  };

  public editUser = async (user: User): Promise<void> => {
    const userDB: IUserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
    };

    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .update(userDB)
      .where({ id: userDB.id });
  };
}
