export enum USER_ROLES {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES
  ) {}

  // Getters

  public getId = () => {
    return this.id;
  };

  public getName = () => {
    return this.name;
  };

  public getEmail = () => {
    return this.email;
  };

  public getPassword = () => {
    return this.password;
  };

  public getRole = () => {
    return this.role;
  };
}

export interface ISignupInputDBDTO {}

export interface ISignupInputDTO {
  name: string;
  email: string;
  password: string;
}
export interface IUserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
}
export interface ILoginInputDTO {
  email: string;
  password: string;
}
