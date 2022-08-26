// Criando tipos

export type Transaction = {
  value: number;
  date: string;
  description: string;
};

type BankStatementType = Transaction[];

export type BankAccount = {
  name: string;
  cpf: string;
  date: string;
  balance: number;
  bankStatement: BankStatementType;
};

export type Transfer = {
  receiverName: string;
  receiverCpf: string;
  value: number;
};
