export class Buyer {
  constructor(
    private name: string,
    private email: string,
    private cpf: string
  ) {}

  // Getters

  public getName = () => {
    return this.name;
  };

  public getEmail = () => {
    return this.email;
  };

  public getCpf = () => {
    return this.cpf;
  };
}
