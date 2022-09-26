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

// export interface ISignupInputDBDTO {

// }

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
export interface GetInfoOutputDTO {
  id: string;
  name: string;
  email: string;
}
export interface IGetInfoInputDTO {
  token: string;
  id: string;
}
export interface IFollowInputDTO {
  token: string;
  idToFollow: string;
}
export interface IUnfollowInputDTO {
  token: string;
  idToUnfollow: string;
}
export interface IFollowOutputDTO {
  message: string;
}
export interface IFeedOutputDTO {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
  userName: string;
}
export interface IInputFollowDTODB {
  id: string;
  followed_id: string;
  followed_name: string;
  follower_id: string;
  follower_name: string;
}
