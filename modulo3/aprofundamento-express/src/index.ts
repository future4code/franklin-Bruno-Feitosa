import express, { Request, response, Response } from "express";
import cors from "cors";

// Cores
const green: string = "\x1b[32m";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () =>
  console.log(green + "O servidor está rodando na porta 3003...")
);

// Variáveis de Tipo

type Todos = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// Base de dados de Todos

const baseDeDadosTodos: Todos[] = [
  { userId: 1, id: 1, title: "Acordar", completed: true },
  { userId: 2, id: 2, title: "Estudar", completed: true },
  { userId: 3, id: 3, title: "Trabalhar", completed: false },
  { userId: 4, id: 4, title: "Beber Água", completed: false },
];

// Rotas

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send({ message: "Pong! 🏓" });
});

app.get("/todos/:completed", (req: Request, res: Response) => {
  const completed: string = req.params.completed;
  const filterByStatus = baseDeDadosTodos.filter((todo) => {
    return completed === String(todo.completed);
  });
  res.status(200).send({ Todos: filterByStatus });
});

app.get("/todos-by-user/:userId", (req: Request, res: Response) => {
  const userId: number = Number(req.params.userId);

  const filterByUserId = baseDeDadosTodos.filter((todo) => {
    return userId === todo.userId;
  });

  res.status(200).send({ Todos: filterByUserId });
});

app.post("/create-todo", (req: Request, res: Response) => {
  const [Todo] = req.body;
  const baseDeDadosTodosAtualizada = [...baseDeDadosTodos, Todo];
  res.status(200).send({ Todos: baseDeDadosTodosAtualizada });
});

app.put("/todos/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const { completed } = req.body;
  const findTodoById = baseDeDadosTodos.filter((todo) => {
    return id === todo.id;
  });

  // Como o ID é único, não farei esse map para alterar. Usarei sempre a primeira posição do array supondo que não tenha mais de um objeto.

  // const baseDeDadosTodosMap = findTodoById.map((todo) => {
  //   todo.completed = completed;
  // });

  findTodoById[0].completed = completed;

  res.status(201).send({ Todos: baseDeDadosTodos });
});

app.delete("/delete-todo/:id", (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  // if (id === undefined) res.status(400).send({ message: "Erro" });

  const novaBaseDeTodos: Todos[] = [...baseDeDadosTodos];
  const todoRemovido = baseDeDadosTodos?.find((todo) => {
    return id === todo.id;
  });
  id >= 1 || id > novaBaseDeTodos.length
    ? novaBaseDeTodos.splice(id - 1, 1)
    : novaBaseDeTodos;
  res.status(201).send({ Todos: novaBaseDeTodos, todoRemovido });
});
