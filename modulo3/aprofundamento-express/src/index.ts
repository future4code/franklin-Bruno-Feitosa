import express from "express";
import cors from "cors";

// Cores
const green: string = "\x1b[32m";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () =>
  console.log(green + "O servidor está rodando na porta 3003...")
);
