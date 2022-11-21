export class Buyer {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private cpf: string
  ) {}

  // Getters

  public getName = () => {
    return this.name;
  };

  public getEmail = () => {
    return this.email;
  };
  public getPassword = () => {
    return this.password;
  };

  public getCpf = () => {
    return this.cpf;
  };
}

export interface ICreateBuyerInputDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
}
export interface ICreateBuyerInputDTODB {
  buyerId: string;
  buyer: Buyer;
}
export interface IBuyersInfoInputDTO {
  buyerId: string;
  token: string;
}
export interface ILoginInputDTO {
  email: string;
  password: string;
}
export interface IEditUserInputDTO {
  token: string;
  name: string | undefined;
  email: string | undefined;
}
export interface IEditUserPasswordInputDTO {
  token: string;
  previousPassword: string;
  newPassword: string;
}
export interface IEditUserPasswordInputDTODB {
  buyerId: string;
  password: string;
}

export interface IEditUserNamelInputDTODB {
  buyerId: string;
  name: string;
}
export interface IEditUserEmailInputDTODB {
  buyerId: string;
  email: string;
}
export interface IEditUserBothPropertiesInputDTODB {
  name: string;
  email: string;
}

export interface IGetBuyerOutputDTODB {
  buyerId: string;
  buyerName: string;
  email: string;
  password: string;
  cpf: string;
}
