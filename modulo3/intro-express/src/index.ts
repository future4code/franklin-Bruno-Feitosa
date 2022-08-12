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

const baseDeDadosUsers: User[] = [
  Bruno, // User criado na linha 28.
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

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Terror: Post = {
  userId: 1,
  id: 1,
  title: "Recomendação de Terror",
  body: "Para amantes do terror psicológico, recomendo o filme Us do Jordan Peele.",
};

const baseDeDadosPosts: Post[] = [
  Terror,
  {
    userId: 2,
    id: 2,
    title: "Recomendação de Animes",
    body: "Para amantes de animes, recomendo o Fullmetal Alchemist Brotherhood.",
  },
  {
    userId: 3,
    id: 3,
    title: "Recomendação de FPS",
    body: "Para amantes de jogos de tiro, recomendo o jogo Valorant.",
  },
  {
    userId: 4,
    id: 4,
    title: "Recomendação de MOBA",
    body: "Para amantes de jogos MOBA, recomendo o jogo League of Legends.",
  },
];

app.get("/users", (request: Request, response: Response) => {
  response.status(200).send(baseDeDadosUsers);
});

app.get("/posts", (request: Request, response: Response) => {
  response.status(200).send(baseDeDadosPosts);
});

app.post("/posts/:userId", (request: Request, response: Response) => {
  const userPost = Number(request.params.userId);
  const filteredPost = baseDeDadosPosts.filter((post) => {
    return post.userId === userPost;
  });
  response.status(200).send({ filteredPost });
});

// app.delete("/delete-post/:id", (request: Request, response: Response) => {
//   response.status(200).send({ message: "O post foi deletado com sucesso." });
// });
