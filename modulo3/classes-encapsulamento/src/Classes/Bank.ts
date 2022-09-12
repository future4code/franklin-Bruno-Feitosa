import { UserAccount } from "./UserAccounts";

export class Bank {
  private accounts: UserAccount[];

  constructor(accounts: UserAccount[]) {
    this.accounts = accounts;
  }

  public addAccount(account: UserAccount): UserAccount[] {
    this.accounts.push(account);
    return this.accounts;
  }

  public getAccounts(): UserAccount[] {
    return this.accounts;
  }
  public setAccounts(accounts: UserAccount[]): UserAccount[] {
    return (this.accounts = accounts);
  }
}
