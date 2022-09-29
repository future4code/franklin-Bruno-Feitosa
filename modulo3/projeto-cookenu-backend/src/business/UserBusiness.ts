import { UserDatabase } from "../database/UserDatabase";
import {
  GetInfoOutputDTO,
  IDeleteUserInputDTO,
  IFeedOutputDTO,
  IFollowInputDTO,
  IFollowOutputDTO,
  IGetInfoInputDTO,
  IInputFollowDTODB,
  ILoginInputDTO,
  ISignupInputDTO,
  IUnfollowInputDTO,
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

  public getInfoById = async (input: IGetInfoInputDTO) => {
    const id = input.id;
    const token = input.token;

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

  public follow = async (input: IFollowInputDTO) => {
    const idToFollow = input.idToFollow;
    const token = input.token;

    if (!idToFollow) {
      throw new Error("Id não informado");
    }

    if (!token) {
      throw new Error("Token não informado");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const user = await this.UserDatabase.getUserById(tokenInfo.id);

    const userToFollow = await this.UserDatabase.getUserById(idToFollow);

    const followRelation = await this.UserDatabase.getFollowRelationById(
      idToFollow
    );

    if (followRelation && tokenInfo.id === followRelation.follower_id) {
      throw new Error("Você já seguiu essa pessoa");
    }

    if (user.name === userToFollow.name) {
      throw new Error("Você não pode se seguir");
    }

    const id = await this.IdGenerator.generate();

    const inputFollowDB: IInputFollowDTODB = {
      id,
      followed_id: userToFollow.id,
      followed_name: userToFollow.name,
      follower_id: user.id,
      follower_name: user.name,
    };

    await this.UserDatabase.followUserDB(inputFollowDB);

    const response: IFollowOutputDTO = {
      message: "Seguido com sucesso",
    };

    return response;
  };

  public unfollow = async (input: IUnfollowInputDTO) => {
    const idToUnfollow = input.idToUnfollow;
    const token = input.token;

    if (!idToUnfollow) {
      throw new Error("Id não informado");
    }

    if (!token) {
      throw new Error("Token não informado");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const user = await this.UserDatabase.getUserById(tokenInfo.id);

    const userToFollow = await this.UserDatabase.getUserById(idToUnfollow);

    const followRelation = await this.UserDatabase.getFollowRelationById(
      idToUnfollow
    );

    if (followRelation && !(tokenInfo.id === followRelation.follower_id)) {
      throw new Error("Você não seguiu essa pessoa");
    }

    if (user.name === userToFollow.name) {
      throw new Error("Você não pode parar de se seguir");
    }

    await this.UserDatabase.unfollowUserDB(followRelation.id);

    const response: IFollowOutputDTO = {
      message: "Deixou de seguir com sucesso",
    };

    return response;
  };

  public feed = async (token: string) => {
    if (!token) {
      throw new Error("Token não informado");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    const user = await this.UserDatabase.getUserById(tokenInfo.id);

    const feeds = await this.UserDatabase.feedDB(user.id);

    const feedList = feeds.map((feed) => {
      const output: IFeedOutputDTO = {
        id: feed.id,
        title: feed.title,
        description: feed.description,
        createdAt: feed.createdAt,
        userId: feed.userId,
        userName: feed.userName,
      };

      return output;
    });

    const response = {
      recipes: feedList,
    };

    return response;
  };

  public deleteUser = async (input: IDeleteUserInputDTO) => {
    const token = input.token;
    const id = input.id;

    if (!token) {
      throw new Error("Token não informado");
    }

    const tokenInfo = await this.Authenticator.getTokenPayload(token);

    if (!tokenInfo) {
      throw new Error("Token inválido");
    }

    if (tokenInfo.role !== "ADMIN") {
      throw new Error("Você precisa ser administrador para deletar uma conta");
    }

    const user = await this.UserDatabase.getUserById(id);

    if (!user) {
      throw new Error("O usuário não existe");
    }

    await this.UserDatabase.deleteRecipeDB(id);
    await this.UserDatabase.deleteUserDB(id);

    const response = {
      message: "Usuário deletada com sucesso",
    };

    return response;
  };
}
