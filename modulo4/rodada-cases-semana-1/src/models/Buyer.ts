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

export interface IGetBuyerOutputDTODB {
  buyerId: string;
  buyerName: string;
  email: string;
  password: string;
  cpf: string;
}
