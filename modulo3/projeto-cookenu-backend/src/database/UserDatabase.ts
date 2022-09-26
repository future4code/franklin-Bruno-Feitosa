import { IInputFollowDTODB, IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Cookenu_Users";
  public static TABLE_RECIPES = "Cookenu_Recipes";
  public static TABLE_FOLLOWERS = "Cookenu_Follow";

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

  public getFollowRelationById = async (
    idToFollow: string
  ): Promise<IInputFollowDTODB> => {
    const result: IInputFollowDTODB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_FOLLOWERS
    )
      .select("*")
      .where({ followed_id: idToFollow });

    return result[0];
  };

  public followUserDB = async (input: IInputFollowDTODB) => {
    await UserDatabase.connection(UserDatabase.TABLE_FOLLOWERS).insert(input);
  };

  public unfollowUserDB = async (id: string) => {
    await UserDatabase.connection(UserDatabase.TABLE_FOLLOWERS)
      .delete()
      .where({ id });
  };

  public feedDB = async (id: string) => {
    const result = await UserDatabase.connection(UserDatabase.TABLE_USERS)
      .innerJoin(
        UserDatabase.TABLE_RECIPES,
        `${UserDatabase.TABLE_USERS}.id`,
        "=",
        `${UserDatabase.TABLE_RECIPES}.user_id`
      )
      .select("*")
      .where(`${UserDatabase.TABLE_USERS}.id`, `${id}`);

    return result;
  };
}
