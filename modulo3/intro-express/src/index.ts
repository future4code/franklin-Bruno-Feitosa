import express, { Request, Response } from "express";
import cors from "cors";

// Cores
const green: string = "\x1b[32m";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log(green + "O servidor está rodando na porta 3003...");
});

app.get("/", (request: Request, response: Response) => {
  response.status(200).send({ message: "Acessou a url base com sucesso." });
});

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  website: string;
};

const Bruno: User = {
  id: 1,
  name: "Bruno Britto",
  phone: "123456789",
  email: "bruno@email.com",
  website: "www.bruno.com.br",
};

const baseDeDados: object[] = [
  Bruno, // Coloquei o usuário criado na linha 28.
  {
    id: 2,
    name: "Thiago Britto",
    phone: "123123123",
    email: "thiago@email.com",
    website: "www.thiago.com.br",
  },
  {
    id: 3,
    name: "Lucas Britto",
    phone: "412312321",
    email: "lucas@email.com",
    website: "www.lucas.com.br",
  },
];

app.get("/users", (request: Request, response: Response) => {
  response.status(200).send(baseDeDados);
});
