import express, { json } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();
const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "3006"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
  },
});

const app = express();
app.use(express.json());
app.use(cors());

// Color
const blue = "\x1b[36m";
const red = "\x1b[32m";

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`${blue}Servidor rodando na porta: ${address.port}`);
  } else {
    console.error(`${red}Falha ao iniciar o servidor.`);
  }
});
