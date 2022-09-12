import express, { Request, Response } from "express";
import cors from "cors";
import { BankAccount, Transaction, Transfer } from "./types";

// Cores
const purple = "\x1b[35m";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(purple + "Servidor rodando na porta 3003...");
});

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

  const searchAccountCpf = bankAccountList.find((account) => {
    return account.cpf === req.body.cpf;
  });

  dateToday.getFullYear() - dateBirth.getFullYear() >= 18 && !searchAccountCpf
    ? bankAccountList.push(newAccount) &&
      res.status(201).send({ bankAccountList: bankAccountList })
    : res.status(401).send({
        message:
          "Unauthorized or there is already an account with the specified cpf",
      });
});

// Pegar Saldo
app.get("/getBalance", (req: Request, res: Response) => {
  const name: string = String(req.query.name);
  const cpf: string = String(req.query.cpf);

  const filteredAccountBalance = bankAccountList.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });

  if (!filteredAccountBalance.length)
    return res
      .status(404)
      .send({ message: "An account with this CPF or name was not found." });

  res.status(202).send({
    accountName: filteredAccountBalance[0].name,
    accountCpf: filteredAccountBalance[0].cpf,
    accountBalance: `R$ ${filteredAccountBalance[0].balance}`,
  });
});

// Pegar saldo com o cpf
app.get("/getBalanceByCpf", (req: Request, res: Response) => {
  const cpf: string = String(req.query.cpf);

  const findAccountCpf = bankAccountList.filter((account) => {
    return account.cpf === cpf;
  });

  if (!findAccountCpf.length)
    return res
      .status(404)
      .send({ message: "An account with this CPF was not found." });

  res.status(200).send({
    accountName: findAccountCpf[0].name,
    accountCpf: findAccountCpf[0].cpf,
    accountBalance: `R$ ${findAccountCpf[0].balance}`,
  });
});

// Adicionar Saldo

app.post("/addBalance", (req: Request, res: Response) => {
  const name: string = String(req.query.name);
  const cpf: string = String(req.query.cpf);
  const { balance } = req.body;

  const filteredAccountBalance = bankAccountList.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });

  if (!filteredAccountBalance.length)
    return res
      .status(401)
      .send({ message: "An account with this CPF or name was not found." });

  filteredAccountBalance[0].balance += balance;
  res.status(202).send({ accountInfo: filteredAccountBalance });
});

// Pagar Conta
app.post("/payment", (req: Request, res: Response) => {
  const currentDate = (date: Date): string => {
    const day: string = date.getDate().toString();
    const month: string = (date.getMonth() + 1).toString();
    const year: string = date.getFullYear().toString();

    const currentDate = `${day}/${0 + month}/${year}`;

    return currentDate;
  };

  const name: string = String(req.query.name);
  const cpf: string = String(req.query.cpf);
  const body: Transaction = req.body;
  const paymentDate: Date = req.body.date || currentDate(new Date());

  if (!body.value || !body.description || !body.date || !name || !cpf)
    return res.status(500).send({ message: "Internal server error" });

  const filteredAccount = bankAccountList.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });

  if (!filteredAccount.length)
    return res.status(404).send({ message: "Account not found" });

  if (paymentDate.toString() < currentDate(new Date())) {
    return res.status(401).send({
      paymentDate: "The payment date cannot be earlier than the current date",
    });
  }
  filteredAccount[0].balance -= body.value;
  filteredAccount[0]?.bankStatement.push(body);

  currentDate(new Date()) === paymentDate.toString()
    ? res.status(202).send({
        paymentDate: `Paid today: ${paymentDate}`,
        accountInfo: filteredAccount,
      })
    : res.status(202).send({
        paymentDate: `Payment scheduled for: ${paymentDate}`,
        accountInfo: filteredAccount,
      });
});

// Transferência Interna
app.put("/transfer", (req: Request, res: Response) => {
  const currentDate = (date: Date): string => {
    const day: string = date.getDate().toString();
    const month: string = (date.getMonth() + 1).toString();
    const year: string = date.getFullYear().toString();

    const currentDate = `${day}/${0 + month}/${year}`;

    return currentDate;
  };

  const name: string = String(req.query.name);
  const cpf: string = String(req.query.cpf);
  const body: Transfer = req.body;
  const transferDate: Date = req.body.date || currentDate(new Date());

  const filteredAccount = bankAccountList?.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });

  const filteredAccountReceiver = bankAccountList?.filter((account) => {
    return (
      body.receiverName === account.name && body.receiverCpf === account.cpf
    );
  });

  if (!filteredAccount.length || !filteredAccountReceiver.length)
    return res.status(404).send({ message: "Account not found" });

  if (transferDate.toString() < currentDate(new Date())) {
    return res.status(401).send({
      transferDate: "The transfer date cannot be earlier than the current date",
    });
  }

  filteredAccount[0].balance -= body.value;
  filteredAccountReceiver[0].balance += body.value;

  currentDate(new Date()) === transferDate.toString()
    ? res.status(202).send({
        transferredValue: req.body.value,
        transferDate: `Transferred today: ${transferDate}`,
        transferAccountInfo: filteredAccount,
        receiverAccountInfo: filteredAccountReceiver,
      })
    : res.status(202).send({
        transferredValue: req.body.value,
        transferDate: `Transfer scheduled for: ${transferDate}`,
        transferAccountInfo: filteredAccount,
        receiverAccountInfo: filteredAccountReceiver,
      });
});

// Adicionar saldo com PUT
app.put("/addBalance", (req: Request, res: Response) => {
  const name: string = String(req.query.name);
  const cpf: string = String(req.query.cpf);
  const { balance } = req.body;

  const filteredAccountBalance = bankAccountList.filter((account) => {
    return name === account.name && cpf === account.cpf;
  });

  if (!filteredAccountBalance.length)
    return res
      .status(401)
      .send({ message: "An account with this CPF or name was not found." });

  filteredAccountBalance[0].balance += balance;
  res.status(202).send({ accountInfo: filteredAccountBalance });
});
