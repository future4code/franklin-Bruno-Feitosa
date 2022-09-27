import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export interface User {
  id: number;
  name: string;
  nickname: string;
  email: string;
}

export const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
  },
});

const TABLE_USERS = "TodoListUser";

export const createUser = async (user: User) => {
  await connection(TABLE_USERS).insert(user);
};

export const deleteUserById = async (id: number) => {
  await connection(TABLE_USERS).delete().where({ id });
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const result = await connection(TABLE_USERS).where({ email });

  return result[0];
};
