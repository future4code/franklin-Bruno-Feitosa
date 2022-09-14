import UserDatabase from "../database/UserDatabase";
import { User, USER_ROLES } from "../model/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export default class UserBusiness {
  public signup = async (input: any) => {
    const name: string = input.name;
    const email: string = input.email;
    const password: string = input.password;

    if (!name || typeof name !== "string") {
      throw new Error("Parâmetro 'name' inválido");
    }

    if (!email || typeof email !== "string") {
      throw new Error("Parâmetro 'email' inválido");
    }

    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const user = new User(id, name, email, hashPassword);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(user);

    const payload: ITokenPayload = {
      id: user.getId(),
      role: user.getRole(),
    };

    const authenticator = new Authenticator();
    const token = authenticator.generateToken(payload);

    const response = {
      token,
    };

    return response;
  };

  public login = async (input: any) => {
    const email: string = input.email;
    const password: string = input.password;

    if (!email || typeof email !== "string") {
      throw new Error("Parâmetro 'email' inválido");
    }

    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }

    const userDatabase = new UserDatabase();

    const userDb = await userDatabase.getUserByEmail(email);

    const hashManager = new HashManager();
    const comparedPassword = await hashManager.compare(
      password,
      userDb.password
    );

    if (!comparedPassword) {
      throw new Error("Senha inválida");
    }

    const user = new User(
      userDb.id,
      userDb.name,
      userDb.email,
      userDb.hashPassword
    );

    const payload: ITokenPayload = {
      id: user.getId(),
      role: user.getRole(),
    };

    const authenticator = new Authenticator();
    const token = authenticator.generateToken(payload);

    const response = {
      token,
    };

    return response;
  };

  public getAllUsers = async (token: string): Promise<any> => {
    const tokenDb: string = token;

    if (!tokenDb) {
      throw new Error("Acesso não autorizado");
    }

    const userDatabase = new UserDatabase();
    const users = await userDatabase.getAllUserFromDb();

    const userList: User[] = users.map((user) => {
      return user;
    });

    const response = userList;

    return response;
  };

  public deleteUser = async (token: string, id: string): Promise<any> => {
    const tokenDb: string = token;
    const idDb: string = id;

    if (!idDb) {
      throw new Error("Id não encontrado");
    }

    if (!tokenDb) {
      throw new Error("Acesso não autorizado");
    }

    const userDatabase = new UserDatabase();

    const searchById = await userDatabase.searchUserById(id);

    if (!searchById) {
      throw new Error("Usuário não existe");
    }

    await userDatabase.deleteUserFromDb(id);

    const response = { message: "Usuário apagado com sucesso!" };

    return response;
  };
}
