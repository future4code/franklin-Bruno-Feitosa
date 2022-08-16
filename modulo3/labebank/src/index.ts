import express, { Request, Response } from "express";
import cors from "cors";
import internal from "stream";
import { brotliDecompressSync } from "zlib";

// Cores
const purple = "\x1b[35m";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(purple + "Servidor rodando na porta 3003...");
});

// Criando tipos

type Transaction = {
  value: number;
  date: string;
  description: string;
};

type BankStatementType = Transaction[];

type BankAccount = {
  name: string;
  cpf: string;
  date: string;
  balance: number;
  bankStatement: BankStatementType;
};

type Transfer = {
  receiverName: string;
  receiverCpf: string;
  value: number;
};

// Contas criadas
const dateAccount1: Date = new Date("08/20/1996");

const account1: BankAccount = {
  name: "Bruno Britto",
  cpf: "12345678911",
  date: dateAccount1.toLocaleDateString(),
  balance: 9900,
  bankStatement: [
    { value: 100, date: "20/08/2022", description: "Pagamento basquete ANSEF" },
  ],
};

// Array global de contas

const bankAccountList: BankAccount[] = [account1];

// Lista usuários da aplicação

app.get("/users", (req: Request, res: Response) => {
  res.send(bankAccountList);
});

// Criar Conta
app.post("/create", (req: Request, res: Response) => {
  // A data do body segue o formato MM/DD/YYYY
  const newAccount: BankAccount = req.body;

  const dateBirth: Date = new Date(newAccount.date);
  const dateToday: Date = new Date();

  dateToday.getFullYear() - dateBirth.getFullYear() >= 18
    ? bankAccountList.push(newAccount) &&
      res.status(201).send({ bankAccountList: bankAccountList })
    : res.status(401).send({ message: "Não autorizado" });
});

// Pegar Saldo
app.get("/getBalance/:name/:cpf", (req: Request, res: Response) => {
  const name: string = req.params.name;
  const cpf: string = req.params.cpf;

  const filteredAccountBalance = bankAccountList.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });

  res.status(202).send({ Balance: `R$ ${filteredAccountBalance[0].balance}` });
});

// Adicionar Saldo

app.post("/addBalance/:name/:cpf", (req: Request, res: Response) => {
  const name: string = req.params.name;
  const cpf: string = req.params.cpf;
  const { balance } = req.body;

  const filteredAccountBalance = bankAccountList.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });
  filteredAccountBalance[0].balance += balance;
  res.status(202).send({ accountInfo: filteredAccountBalance });
});

// Pagar Conta
app.post("/payment/:name/:cpf", (req: Request, res: Response) => {
  const name: string = req.params.name;
  const cpf: string = req.params.cpf;
  const body: Transaction = req.body;

  const filteredAccount = bankAccountList.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });
  filteredAccount[0].balance -= body.value;
  filteredAccount[0].bankStatement.push(body);
  res.status(202).send({ accountInfo: filteredAccount });
});

// Transferência Interna
app.put("/transfer/:name/:cpf", (req: Request, res: Response) => {
  const name: string = req.params.name;
  const cpf: string = req.params.cpf;
  const body: Transfer = req.body;

  const filteredAccount = bankAccountList?.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });

  const filteredAccountReceiver = bankAccountList?.filter((account) => {
    return (
      body.receiverName === account.name && body.receiverCpf === account.cpf
    );
  });

  filteredAccount[0].balance -= body.value;
  filteredAccountReceiver[0].balance += body.value;

  res.status(202).send({
    account1Info: filteredAccount,
    account2Info: filteredAccountReceiver,
  });
});
