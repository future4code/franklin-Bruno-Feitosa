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

  public deleteUser = async (input: any): Promise<any> => {
    const accessToken: string = input.token;
    const idToDelete: string = input.id;

    const authenticator = new Authenticator();
    const tokenInfo = authenticator.getTokenPayload(accessToken);

    if (!idToDelete) {
      throw new Error("Id não encontrado");
    }

    if (!accessToken) {
      throw new Error("Acesso não autorizado");
    }

    const userDatabase = new UserDatabase();

    const userAuth = await userDatabase.searchUserById(tokenInfo.id);

    if (userAuth.role !== USER_ROLES.ADMIN) {
      throw new Error("Não autorizado");
    }

    const searchById = await userDatabase.searchUserById(idToDelete);

    if (!searchById) {
      throw new Error("Usuário não existe");
    }

    if (tokenInfo.id === searchById.id) {
      throw new Error("Você não pode deletar sua própria conta");
    }

    await userDatabase.deleteUserFromDb(idToDelete);

    const response = { message: "Usuário apagado com sucesso!" };

    return response;
  };
}
