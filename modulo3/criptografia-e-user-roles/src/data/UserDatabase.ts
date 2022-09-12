import { user } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public create = async (newUser: user) => {
    await this.getConnection()("to_do_list_users").insert(newUser);
  };
  public edit = async (
    id: string,
    columnsUpdate: { name: string; nickname: string }
  ): Promise<number> => {
    const affectRows = await this.getConnection()("to_do_list_users")
      .update(columnsUpdate)
      .where({ id });
    return Number(affectRows);
  };

  public delete = async (id: string) => {
    const result = await this.getConnection()("to_do_list_users")
      .delete()
      .where({ id });

    return result;
  };

  public getByEmail = async (email: string): Promise<user> => {
    const [result] = await this.getConnection()("to_do_list_users").where({
      email,
    });
    return result;
  };
  public getById = async (id: string): Promise<user> => {
    const [result] = await this.getConnection()("to_do_list_users").where({
      id,
    });
    return result;
  };
}
