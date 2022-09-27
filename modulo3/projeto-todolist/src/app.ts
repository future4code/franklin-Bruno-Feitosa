import express from "express";
import cors from "cors";
import { AddressInfo } from "net";

export const app = express();
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

// export default app;
