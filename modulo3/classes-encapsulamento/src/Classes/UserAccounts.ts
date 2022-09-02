import { Transaction } from "./Transaction";

export class UserAccount {
  private cpf: string;
  private name: string;
  private age: number;
  private balance: number = 0;
  private transactions: Transaction[] = [];

  constructor(cpf: string, name: string, age: number) {
    console.log("Chamando o construtor da classe UserAccount");
    this.cpf = cpf;
    this.name = name;
    this.age = age;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): string {
    return (this.name = name);
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string): string {
    return (this.cpf = cpf);
  }

  public getAge(): number {
    return this.age;
  }

  public setAge(age: number): number {
    return (this.age = age);
  }
}
